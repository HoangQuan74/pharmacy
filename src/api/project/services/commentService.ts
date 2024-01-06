import { Comment } from "../../../database/entities/Comment";
import { AppDataSource } from "../../../../src/ormconfig";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class CommentService {
  private commentRes = AppDataSource.getRepository(Comment);

  create(data: DeepPartial<Comment>) {
    return this.commentRes.create(data);
  }

  async save(data: DeepPartial<Comment>): Promise<Comment> {
    return await this.commentRes.save(data);
  }

  async getAll(filter?: FindOneOptions<Comment>) {
    return await this.commentRes.find(filter);
  }

  async softRemove(Comment: Comment[]) {
    return await this.commentRes.softRemove(Comment);
  }

  public getOne = async (filter?: FindOneOptions<Comment>) => {
    return await this.commentRes.findOne(filter);
  };

  async update(
    where: FindOptionsWhere<Comment>,
    data: DeepPartial<Comment>
  ): Promise<Boolean> {
    const result = await this.commentRes.update(where, data);
    return !!result.affected;
  }

  async isCommentAuthor(commentId: number, userId: number) {
    const data = await this.getOne({where: {id: commentId, userId: userId}})
    return data;
  }
}
