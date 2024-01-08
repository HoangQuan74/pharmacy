import { Priority, Task, TaskStatus } from "../../../database/entities/Task";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class TaskService {
    private taskRes = AppDataSource.getRepository(Task);


    create(data: DeepPartial<Task>) {
        return this.taskRes.create(data);
    }

    async save(data: DeepPartial<Task>): Promise<Task> {
        return await this.taskRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Task>) {
        return await this.taskRes.find(filter);
    }

    async softRemove(Task: Task[]) {
        return await this.taskRes.softRemove(Task);
    }

    public getOne = async (filter?: FindOneOptions<Task>) => {
        return await this.taskRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<Task>,
        data: DeepPartial<Task>
    ): Promise<Boolean> {
        const result = await this.taskRes.update(where, data);
        return !!result.affected;
    }

    async tasks(
        projectId: number,
        searchText: string = null,
        priority: Priority = null,
        status: TaskStatus = null,
    ) {
        const qb = this.taskRes
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.checkList', 'checkList')
            .leftJoinAndSelect('task.comments', 'comments')
            .leftJoinAndSelect('comments.author', 'author')
            .where('task.projectId = :projectId', { projectId })
        if (status) {
            qb.andWhere('task.status = :status', { status });
        }
        if (priority) {
            qb.andWhere('task.priority = :priority', { priority });
        }
        if (searchText) {
            qb.andWhere(new Brackets((qb) => {
                qb.orWhere('task.name = :searchText')
                    .orWhere('task.description = :searchText')
            })).setParameters({ searchText: `%${searchText}%` });
        }
        const [items, total] = await qb.getManyAndCount();
        return { items, total };
    }
}