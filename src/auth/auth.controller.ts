import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Авторизация" })
  @ApiResponse({ status: 200, type: "" })
  @Post("/login")
  async login(@Body() dto: CreateAdminDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 200, type: "" })
  @Post("/registration")
  async registration(@Body() dto: CreateAdminDto) {
    return this.authService.registration(dto);
  }
}
