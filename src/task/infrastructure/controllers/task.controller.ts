import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateTaskDto, UpdateTaskDto } from 'src/task/application/dto/task.dto';
import { TaskService } from 'src/task/application/services/task.service';
import { User } from 'src/user/domain/entities/user.entity';

@Controller('task')
export class TaskController {
    constructor(
        @Inject()
        private readonly taskService: TaskService,
    ) {}

    @Get()
    @Auth()
    getTasks(
        @GetUser() user: User,
        @Query() pagination: PaginationDto 
    ) {
        return this.taskService.getTasks(user, pagination);
    }

    @Get(':id')
    @Auth()
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User,
    ) {
        return this.taskService.getTaskById(user, id);
    }

    @Post()
    @Auth()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ) {
        return this.taskService.createTask(user, createTaskDto);
    }

    @Put(':id')
    @Auth()
    updateTask(
        @Param('id') id: string, 
        @Body() task: UpdateTaskDto,
        @GetUser() user: User,
    ) {
        return this.taskService.updateTask(user, id, task);
    }

    @Delete(':id')
    @Auth()
    deleteTask(
        @GetUser() user: User,
        @Param('id') id: string
    ) {
        return this.taskService.deleteTask(user, id);
    }
}
