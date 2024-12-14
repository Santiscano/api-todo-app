import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Task } from '../entities/task.entity';
import { User } from 'src/user/domain/entities/user.entity';
import { UpdateTaskDto } from 'src/task/application/dto/task.dto';

export interface TaskInterface {
    getTasks(user_id: string, pagination: PaginationDto): Promise<Task[]>;
    getTaskById(user_id: string, id: string): Promise<Task>;
    createTask(user_id: string, task: Task): Promise<Task>;
    updateTask(task: Task, updateTask: UpdateTaskDto): Promise<Task>;
    deleteTask(task: Task): Promise<void>;
}
