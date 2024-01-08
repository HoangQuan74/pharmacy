import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Task } from "./Task";
import { Members } from "./Members";
import { CodeBase } from "./CodeBase";

@Entity()
export class TaskMember extends CodeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column()
  memberId: number;

  @ManyToOne(() => Task, (task) => task.taskMembers)
  @JoinColumn({
    name: "taskId",
    referencedColumnName: "id",
  })
  task: Task;

  @ManyToOne(() => Members, (member) => member.taskMembers)
  @JoinColumn({
    name: "memberId",
    referencedColumnName: "id",
  })
  member: Members;
}
