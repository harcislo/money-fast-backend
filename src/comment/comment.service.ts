import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment
  ) {}

  async createComment(dto: CreateCommentDto) {
    const comment = await this.commentRepository.create(dto);
    return comment;
  }

  async getAllComment() {
    const comments = await this.commentRepository.findAll();
    return comments;
  }

  async updateStatusComment(id: number, status: string) {
    let comment = await this.commentRepository.findOne({ where: { id } });
    comment = await comment.update({ status });
    return comment;
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepository.destroy({ where: { id } });
    return comment;
  }

  async getAllCommentByStatus(status: string) {
    const comments = await this.commentRepository.findAll({
      where: { status },
    });
    return comments;
  }

  async getAllCommentConfirmed() {
    const comments = await this.commentRepository.findAll({
      where: { status: "confirmed" },
    });
    return comments;
  }
}
