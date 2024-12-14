import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { Rol } from './domain/entities/rol.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Rol])],
    exports: [TypeOrmModule],
})
export class UserModule {}
