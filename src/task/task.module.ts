import { Module } from '@nestjs/common';
import { TaskController } from './infrastructure/controllers/task.controller';
import { TaskRepositoryService } from './infrastructure/repository/task-repository.service';
import { TaskService } from './application/services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './domain/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        AuthModule,
    ],
    controllers: [TaskController],
    providers: [TaskRepositoryService, TaskService],
})
export class TaskModule {}
