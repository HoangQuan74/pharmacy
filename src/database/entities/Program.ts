import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { School } from "./School";
import { Student } from "./Student";

@Entity({ name: 'program' })
export class Program extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 50 })
    program_name: string;

    @Column()
    school_id: number;

    @ManyToOne(() => School, (school) => school.id)
    @JoinColumn({
        name: 'school_id',
        referencedColumnName: 'id'
    })
    school?: School;

    @OneToMany(() => Student, (student) => student.program)
    student: Student[];
}