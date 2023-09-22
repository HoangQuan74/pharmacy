import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";

@Entity({ name: 'academic_year' })
export class AcademicYear extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    current_year: number;

    @OneToMany(() => InternSubject, (internSubject) => internSubject.academicYear)
    internSubject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.academicYear)
    examinationBoard?: ExaminationBoard[];
}