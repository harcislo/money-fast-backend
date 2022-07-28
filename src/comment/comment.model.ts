import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface CommentCreateAttrs {
  userName: string;
  text: string;
  rating: number;
}

@Table({ tableName: "comments" })
export class Comment extends Model<Comment, CommentCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный индификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Иванов Иван", description: "Имя пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  userName: string;

  @ApiProperty({ example: "Отличный обменник", description: "Текст отзыва" })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: "5", description: "Рейтинг" })
  @Column({ type: DataType.STRING, allowNull: false })
  rating: number;

  @ApiProperty({ example: "isProcessing", description: "Статус коментария" })
  @Column({ type: DataType.STRING, defaultValue: "isProcessing" })
  status: string;
}
