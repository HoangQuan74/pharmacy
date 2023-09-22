import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { TeachingStatus } from '../../common/constants/status.constant'
import { UserPerson } from "./UserPerson";
import { Department } from "./Department";
import { Class } from "./Class";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { Conversation } from "./Conversation";
import { RegularTodo } from "./RegularTodo";

@Entity({ name: 'teacher' })
export class Teacher extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    dob: Date;

    @Column()
    start_date: Date;

    @Column({ type: 'nvarchar', length: 30 })
    education_level: string;

    @Column()
    experience_year: number;

    @Column({ default: TeachingStatus.teaching })
    current_status: TeachingStatus;

    @Column({ nullable: true })
    department_id: number;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @OneToOne(() => UserPerson, (userPerson) => userPerson.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user_person?: UserPerson;

    @OneToMany(() => Class, (Class) => Class.teacher)
    class?: Class[];

    @OneToMany(() => InternSubject, (internSubject) => internSubject.teacher)
    intern_subject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.President)
    examinationBoardPresident?:ExaminationBoard[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.Secretary)
    examinationBoardSecretary?:ExaminationBoard[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.Asker)
    examinationBoardAsker?:ExaminationBoard[];

    @OneToMany(() => Conversation, (conversation) => conversation.teacher)
    conversation?: Conversation[];

    @OneToMany(() => RegularTodo, (regularTodo) => regularTodo.teacher)
    regularTodo?: RegularTodo[];
}