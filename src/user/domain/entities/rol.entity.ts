import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('rol')
export class Rol {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier for the rol',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @ApiProperty({
        example: 'Admin',
        description: 'Rol name',
        uniqueItems: true,
    })
    @Column('varchar', { unique: true })
    name: string;

    @ApiProperty({
        example: 'Administrator Del Sistema',
        description: 'Rol description',
        uniqueItems: true,
    })
    @Column('varchar', { unique: true })
    description: string;

    // *======relationships======*//
    @OneToMany(
        () => User, // con que tabla se relaciona
        user => user.rol_id // campo de relacion en la otra tabla
    )
    user: User[];
}
