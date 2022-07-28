import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Application } from "./application.model";
import { CreateApplicationDto } from "./dto/create-application.dto";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application) private applicationRepository: typeof Application
  ) {}

  async createApplication(dto: CreateApplicationDto) {
    const application = await this.applicationRepository.create(dto);
    return application;
  }

  async getApplications() {
    const applications = await this.applicationRepository.findAll();
    return applications;
  }

  async getOneApplication(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    return application;
  }

  async getByStatusApplication(status: string) {
    const applications = await this.applicationRepository.findAll({
      where: { status: status },
    });

    return applications;
  }

  async updateStatusApplication(id: number, status: string) {
    let application = await this.applicationRepository.findOne({
      where: { id },
    });
    application = await application.update({ status: status });
    return application;
  }
  async cancelApplication(id: number) {
    let application = await this.applicationRepository.findOne({
      where: { id },
    });
    application = await application.update({ status: "rejected" });
    return application;
  }
}
