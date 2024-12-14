import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { compareSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/user/domain/entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async create(createUserDto: CreateUserDto) {
        try {
            const { password, email, fullname } = createUserDto;

            const user = this.userRepository.create({
                fullname,
                email: email.trim().toLowerCase(),
                password: hashSync(password, 10),
            });

            await this.userRepository.save(user);
            delete user.password;

            return {
                data: {
                    ...user,
                    token: this.getJwt({
                        fullName: user.fullname,
                        email: user.email,
                    })
                },
                message: 'User created successfully',
            }

        } catch (error) {
            this.handleDBError(error);
        }
    }

    async signin(loginUserDto: LoginUserDto) {
        try {
            const { email, password } = loginUserDto;
            if (password === '' || email === '') {
                throw new BadRequestException('Email and password are required');
            }
    
            const user = await this.userRepository.findOne({
                where: { email: email.trim().toLowerCase() },
            })
    
            if (!user) throw new UnauthorizedException('Invalid credentials');
    
            if(!compareSync(password, user.password)) {
                throw new UnauthorizedException('Invalid credentials');
            }
            delete user.password;
    
            return {
                message: 'Login successful',
                data: {
                    ...user,
                    token: this.getJwt({
                        fullName: user.fullname,
                        email: user.email,
                    }),
                },
            };
        } catch (error) {
            this.handleDBError(error);
        }
    }



    // *=============== utility functions ===============
    private getJwt(payload: JwtPayload) {
        return this.jwtService.sign(payload)
    }

    private handleDBError(error: any): never {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new BadRequestException('Email already exists');
        }
        console.log(error);
        throw new InternalServerErrorException('Please check server logs');
    }
}
