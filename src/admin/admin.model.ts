import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface AdminCreateAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, AdminCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный индификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "admin@gmail.com",
    description: "Логин",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "!1234512345", description: "Пароль" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
