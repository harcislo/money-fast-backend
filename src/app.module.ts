import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "./admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { Admin } from "./admin/admin.model";
import { ApplicationModule } from "./application/application.module";
import { Application } from "./application/application.model";
import { CommentModule } from "./comment/comment.module";
import { Comment } from "./comment/comment.model";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      uri: process.env.DATABASE_URL,
      // host: process.env.POSTGRES_HOST,
      // port: Number(process.env.POSTGRES_PORT),
      // username: process.env.POSTGRES_USER,
      // password: process.env.POSTGRES_UPASSWORD,
      // database: process.env.POSTGRES_DB,
      models: [Admin, Application, Comment],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
        },
      },
    }),
    AdminModule,
    ApplicationModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
