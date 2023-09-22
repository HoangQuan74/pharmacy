import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";

@Entity({ name: 'semester' })
export class Semester extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 20 })
    semester_name: string;

    @OneToMany(() => InternSubject, (internSubject) => internSubject.semester)
    internSubject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.semester)
    examinationBoard?: ExaminationBoard[];
}