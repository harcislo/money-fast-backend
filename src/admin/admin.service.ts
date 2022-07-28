import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

  async createAdmin(dto: CreateAdminDto) {
    const admin = await this.adminRepository.create(dto);
    return admin;
  }

  async getAllAdmins() {
    const admins = await this.adminRepository.findAll();
    return admins;
  }

  async getAdminByEmail(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return admin;
  }
}
