import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { DetailTodo } from "./DetailTodo";

@Entity({ name: 'todo_appreciation' })
export class TodoAppreciation extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'mediumtext' })
    content: string;

    @Column()
    todo_id: number;

    @ManyToOne(() => DetailTodo, (detailTodo) => detailTodo.id)
    @JoinColumn({
        name: 'todo_id',
        referencedColumnName: 'id'
    })
    detailTodo?: DetailTodo;
}