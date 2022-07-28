import { ApiProperty } from "@nestjs/swagger";

export class UpdateApplicationDto {
  @ApiProperty({ example: "rejected", description: "Статус" })
  readonly status: string;
}
