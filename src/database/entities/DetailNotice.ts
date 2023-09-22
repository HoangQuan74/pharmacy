import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { Administrator } from "./Administrator";
import { Notice } from "./Notice";

@Entity({ name: 'detail_notice' })
export class DetailNotice extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 200 })
    content: string;

    @Column()
    notice_id: number;

    @ManyToOne(() => Notice, (notice) => notice.id)
    @JoinColumn({
        name: 'notice_id',
        referencedColumnName: 'id'
    })
    notice?: Notice;
}