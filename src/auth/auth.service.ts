import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Admin } from "../admin/admin.model";

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async login(dto: CreateAdminDto) {
    const admin = await this.validateAdmin(dto);
    return this.generateToken(admin);
  }

  async registration(dto: CreateAdminDto) {
    const candidate = await this.adminService.getAdminByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        "Админ с таким email уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const admin = await this.adminService.createAdmin({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(admin);
  }

  private async generateToken(admin: Admin) {
    const payload = { email: admin.email, id: admin.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateAdmin(dto: CreateAdminDto) {
    const admin = await this.adminService.getAdminByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, admin.password);
    if (admin && passwordEquals) {
      return admin;
    }
    throw new UnauthorizedException({
      message: "Неккоректная почта или пароль",
    });
  }
}
