import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateTaskDto, UpdateTaskDto } from 'src/task/application/dto/task.dto';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskInterface } from 'src/task/domain/interfaces/task.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepositoryService implements TaskInterface{
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async getTasks(user_id: string, paginationDto: PaginationDto): Promise<Task[]> {
        return this.taskRepository.find({
            skip: paginationDto.offset,
            take: paginationDto.limit,
            where: { user_id }
        });
    }

    async getTaskById(user_id: string, id: string): Promise<Task> {
        return this.taskRepository.findOne({
            where: { id, user_id },
        })
    }

    async createTask(user_id: string, task: CreateTaskDto): Promise<Task> {
        const taskDB = this.taskRepository.create({
            ...task,
            user_id
        });
        await this.taskRepository.save(taskDB);
        return  taskDB;
    }

    async updateTask(task: Task, taskUpdateDto: UpdateTaskDto): Promise<Task> {
        const updateData = await this.taskRepository.preload({
            ...task,
            ...taskUpdateDto
        });
        await this.taskRepository.save( updateData );
        return updateData;
    }

    async deleteTask(task: Task): Promise<void> {
        await this.taskRepository.remove( task );
    }
}
