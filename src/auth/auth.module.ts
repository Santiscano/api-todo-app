import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Auth } from './decorators'

@Module({
    controllers: [ AuthController ],
    providers: [ AuthService, JwtStrategy ],
    imports: [
        ConfigModule,
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: async (configService: ConfigService) => {
                if (configService.get('SECRET_KEY') === undefined || !configService.get('SECRET_KEY')) {
                    throw new Error('SECRET_KEY is not defined in .env file');
                }
                return {
                    secret: configService.get('SECRET_KEY'),
                    signOptions: { 
                        expiresIn:  configService.get('EXPIRE_TOKEN') || '15m',
                    },
                }
            },
        }),
    ],
    exports: [ JwtStrategy, PassportModule, JwtModule ],
})
export class AuthModule {}
