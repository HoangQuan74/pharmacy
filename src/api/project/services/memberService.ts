import { Members } from "../../../database/entities/Members";
import { AppDataSource } from "../../../../src/ormconfig";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class MemberService {
    private memberRes = AppDataSource.getRepository(Members);


    create(data: DeepPartial<Members>) {
        return this.memberRes.create(data);
    }

    async save(data: DeepPartial<Members>): Promise<Members> {
        return await this.memberRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Members>) {
        return await this.memberRes.find(filter);
    }

    async softRemove(Members: Members[]) {
        return await this.memberRes.softRemove(Members);
    }

    public getOne = async (filter?: FindOneOptions<Members>) => {
        return await this.memberRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<Members>,
        data: DeepPartial<Members>
    ): Promise<Boolean> {
        const result = await this.memberRes.update(where, data);
        return !!result.affected;
    }

    async getMembersByProjectId(projectId: number) {
        const qb = this.memberRes
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.user', 'user')
            .leftJoin('member.project', 'project')
            .where('project.id = :projectId', { projectId })
        return qb.getMany();
    }
}