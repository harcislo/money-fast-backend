import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Application } from "./application.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [SequelizeModule.forFeature([Application]), AuthModule],
})
export class ApplicationModule {}
