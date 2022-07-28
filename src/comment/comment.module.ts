import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comment } from "./comment.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [SequelizeModule.forFeature([Comment]), AuthModule],
})
export class CommentModule {}
