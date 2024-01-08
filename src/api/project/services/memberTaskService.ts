import { TaskMember } from "../../../database/entities/TaskMember";
import { AppDataSource } from "../../../../src/ormconfig";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class MemberTaskService {
    private memberTaskRes = AppDataSource.getRepository(TaskMember);


    create(data: DeepPartial<TaskMember>) {
        return this.memberTaskRes.create(data);
    }

    async save(data: DeepPartial<TaskMember>): Promise<TaskMember> {
        return await this.memberTaskRes.save(data);
    }

    async getAll(filter?: FindOneOptions<TaskMember>) {
        return await this.memberTaskRes.find(filter);
    }

    async softRemove(TaskMember: TaskMember[]) {
        return await this.memberTaskRes.softRemove(TaskMember);
    }

    public getOne = async (filter?: FindOneOptions<TaskMember>) => {
        return await this.memberTaskRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<TaskMember>,
        data: DeepPartial<TaskMember>
    ): Promise<Boolean> {
        const result = await this.memberTaskRes.update(where, data);
        return !!result.affected;
    }
}