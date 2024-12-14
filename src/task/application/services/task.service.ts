import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskRepositoryService } from 'src/task/infrastructure/repository/task-repository.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor(
        private readonly taskRepository: TaskRepositoryService
    ) {}

    async getTasks(user: User, pagination: PaginationDto): Promise<Task[]> {
        try {
            const user_id = user.id;
            const { limit = 10, offset = 0 } = pagination;
    
            return this.taskRepository.getTasks(user_id, { limit, offset });
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async getTaskById(user: User, id: string): Promise<Task> {
        try {
            const user_id = user.id;
            const task = await this.taskRepository.getTaskById(user_id, id);
    
            if (!task) throw new NotFoundException('Task not found');
    
            return task;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
        const user_id = user.id;
        return this.taskRepository.createTask(user_id, createTaskDto);
    }

    async updateTask(user: User, id: string, taskUpdateDto: UpdateTaskDto): Promise<Task> {
        try {
            const task = await this.getTaskById(user, id);
            return this.taskRepository.updateTask(task, taskUpdateDto);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async deleteTask(user: User, id: string): Promise<void> {
        try {
            const task = await this.getTaskById(user, id);
            return this.taskRepository.deleteTask(task);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }


    // *========== UTILS ========== // 
    handleDBExceptions( error: any ) {
        if ( error instanceof NotFoundException ) throw error;
        if ( error.code === '23505' ) throw new BadRequestException(error.detail);
        
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }
}
