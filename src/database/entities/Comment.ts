import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Task } from "./Task";
import { Users } from "./Users";

@Entity({ name: "comment" })
export class Comment extends CodeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  content: string;

  @Column({ default: false })
  isResolved: Boolean;

  @Column()
  userId: number;

  @Column()
  taskId: number;

  @Column({ nullable: true })
  parentId: number;

  // relation
  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({
    name: "taskId",
    referencedColumnName: "id",
  })
  task: Task;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id",
  })
  author?: Users;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({
    name: "parentId",
    referencedColumnName: "id",
  })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies?: Comment[];
}