import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationDto {
  @ApiProperty({ example: "btc", description: "Пользователь отдаёт" })
  readonly fromExchange: string;

  @ApiProperty({ example: "rub", description: "Пользователь получает" })
  readonly inExchange: string;

  @ApiProperty({
    example: "0.005",
    description: "Сумма, отдаваемая пользователем",
  })
  readonly fromSum: string;

  @ApiProperty({
    example: "15000",
    description: "Сумма, получаемая пользователем",
  })
  readonly inSum: string;

  @ApiProperty({ example: "user@gmail.com", description: "Почта пользователя" })
  readonly userMail: string;

  @ApiProperty({
    example: "Иванов Иван Иванович",
    description: "ФИО пользователя",
  })
  readonly userFullName: string;

  @ApiProperty({ example: "123456789", description: "Реквизиты пользователя" })
  readonly userRequisites: string;
}
