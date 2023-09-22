import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { statusFinished, status } from "../../common/constants/status.constant";
import { RegularTodo } from "./RegularTodo";
import { TodoAppreciation } from "./TodoAppreciation";

@Entity({ name: 'detail_todo' })
export class DetailTodo extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 200 })
    todo_name: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column({ default: status.processing })
    completed_status: status;

    @Column({ default: null, nullable: true })
    out_of_expire: statusFinished

    @Column()
    regular_id: number;

    @ManyToOne(() => RegularTodo, (regularTodo) => regularTodo.id)
    @JoinColumn({
        name: 'regular_id',
        referencedColumnName: 'id'
    })
    regularTodo?: RegularTodo;

    @OneToMany(() => TodoAppreciation, (todoAppreciation) => todoAppreciation.detailTodo)
    todoAppreciation?: TodoAppreciation[];
}