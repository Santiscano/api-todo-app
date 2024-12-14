import { Task } from "src/task/domain/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 3 })
    rol_id: number;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    // *======relationships======*//
    @ManyToOne(
        () => Rol,
        (rol: Rol) => rol.user,
        { eager: true, nullable: false }
    )
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;

    @OneToMany(
        () => Task,
        (task: Task) => task.id
    )
    tasks: Task[];
}
