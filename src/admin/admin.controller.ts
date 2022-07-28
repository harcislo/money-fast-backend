import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { AdminService } from "./admin.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./admin.model";
import { AuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Администраторы")
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: "Создание админа" })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() adminDto: CreateAdminDto) {
    return this.adminService.createAdmin(adminDto);
  }

  @ApiOperation({ summary: "Получение всех админов" })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.adminService.getAllAdmins();
  }
}
