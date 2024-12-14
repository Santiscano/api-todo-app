import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { EnvConfiguration } from './config/env.config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true, 
      load: [ EnvConfiguration ], 
      validationSchema: Joi.object({ 
        DB_HOST: Joi.string().required(),
        DB_DB: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        
        SECRET_KEY: Joi.string().required(),
        API_KEY: Joi.string().required(),
        EXPIRE_TOKEN: Joi.string().required(),

        ENVIROMENT: Joi.string().required(),
        ORM_SYNCHRONIZE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      autoLoadEntities: process.env.ENVIROMENT === "development" ? true : false,
      synchronize: process.env.ENVIROMENT === "development" ? Boolean(Number(process.env.ORM_SYNCHRONIZE)) : false, 
    }),
    // Modules
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
