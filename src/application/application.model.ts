import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ApplicationCreateAttrs {
  fromExchange: string;
  inExchange: string;
  fromSum: string;
  inSum: string;

  userMail: string;
  userFullName: string;
  userRequisites: string;
}

@Table({ tableName: "applications" })
export class Application extends Model<Application, ApplicationCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный индификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "btc", description: "Пользователь отдаёт" })
  @Column({ type: DataType.STRING, allowNull: false })
  fromExchange: string;

  @ApiProperty({ example: "rub", description: "Пользователь получает" })
  @Column({ type: DataType.STRING, allowNull: false })
  inExchange: string;

  @ApiProperty({
    example: "0.005",
    description: "Сумма, отдаваемая пользователем",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  fromSum: string;

  @ApiProperty({
    example: "15000",
    description: "Сумма, получаемая пользователем",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  inSum: string;

  @ApiProperty({ example: "user@gmail.com", description: "Почта пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  userMail: string;

  @ApiProperty({
    example: "Иванов Иван Иванович",
    description: "ФИО пользователя",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  userFullName: string;

  @ApiProperty({ example: "123456789", description: "Реквизиты пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  userRequisites: string;

  @ApiProperty({ example: "rejected", description: "Статус" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "inProcessing",
  })
  status: string;
}
