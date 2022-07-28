import { forwardRef, Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./admin.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [SequelizeModule.forFeature([Admin]), forwardRef(() => AuthModule)],
  exports: [AdminService],
})
export class AdminModule {}
