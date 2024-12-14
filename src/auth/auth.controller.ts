import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from 'src/user/domain/entities/user.entity';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    create( @Body() createUserDto: CreateUserDto ) {
        return this.authService.create( createUserDto );
    }

    @Post('login')
    login( @Body() loginUserDto: LoginUserDto ) {
        return this.authService.signin( loginUserDto );
    }

    @Get('test-auth')
    @Auth()
    testAuth(
        @GetUser() user: User
    ) {
        return {
            msg: 'You are authenticated',
            user
        };
    }
}
