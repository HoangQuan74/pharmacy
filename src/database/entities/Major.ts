import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Student } from "./Student";

@Entity({ name: 'major' })
export class Major extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 50 })
    major_name: string;

    @Column()
    department_id: number;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @OneToMany(() => Student, (student) => student.program)
    student: Student[];
}