import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Comment } from "./comment.model";
import { AuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Отзывы")
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: "Получение всех отзывов" })
  @ApiResponse({ status: 200, type: [Comment] })
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.commentService.getAllComment();
  }

  @ApiOperation({ summary: "Получение отзывов по статусу" })
  @ApiResponse({ status: 200, type: [Comment] })
  @UseGuards(AuthGuard)
  @Get(":status")
  async getAllByStatus(@Param("status") status: string) {
    return this.commentService.getAllCommentByStatus(status);
  }

  @ApiOperation({ summary: "Получение подтверждённых отзывов" })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get("/confirmed")
  async getAllConfirmed() {
    return this.commentService.getAllCommentConfirmed();
  }

  @ApiOperation({ summary: "Удаление отзыва по id" })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(AuthGuard)
  @Delete(":id")
  async deleteOne(@Param("id") id: string) {
    return this.commentService.deleteComment(Number(id));
  }

  @ApiOperation({ summary: "Создание отзыва" })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  async createOne(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: "Обновление статуса отзыва" })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(AuthGuard)
  @Put(":id")
  async updateOne(@Param("id") id: string, @Body("status") status: string) {
    return this.commentService.updateStatusComment(Number(id), status);
  }
}
