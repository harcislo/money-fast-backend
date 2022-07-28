import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "admin@gmail.com", description: "Логин" })
  readonly email: string;

  @ApiProperty({ example: "!1234512345", description: "Пароль" })
  readonly password: string;
}
