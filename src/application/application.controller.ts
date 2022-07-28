import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Application } from "./application.model";
import { AuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Заявки")
@Controller("applications")
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @ApiOperation({ summary: "Создание заявки" })
  @ApiResponse({ status: 200, type: Application })
  @Post()
  async create(
    @Req() request,
    @Res({ passthrough: true })
    response,
    @Body() createApplicationDto: CreateApplicationDto
  ) {
    const application = await this.applicationService.createApplication(
      createApplicationDto
    );
    let applicationsId;
    if (request.cookies["applicationsId"]) {
      applicationsId = [
        ...JSON.parse(request.cookies["applicationsId"]),
        application.id,
      ];
    } else {
      applicationsId = [application.id];
    }
    response.cookie("applicationsId", JSON.stringify(applicationsId));
    console.log(applicationsId);
    return application;
  }

  @ApiOperation({ summary: "Получение заявкок по статусу и без него" })
  @ApiResponse({ status: 200, type: [Application] })
  @Get()
  async getAll(@Query("status") status: string) {
    if (status) {
      return this.applicationService.getByStatusApplication(status);
    }
    return this.applicationService.getApplications();
  }

  @ApiOperation({ summary: "Полчуение заявки по id" })
  @ApiResponse({ status: 200, type: Application })
  @Get(":id")
  async getOne(@Param("id") id: string) {
    return this.applicationService.getOneApplication(Number(id));
  }

  @ApiOperation({ summary: "Обновление статуса заявки" })
  @ApiResponse({ status: 200, type: Application })
  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ) {
    return this.applicationService.updateStatusApplication(
      Number(id),
      updateApplicationDto.status
    );
  }

  @ApiOperation({
    summary:
      "Отмена заявки(только пользователям, создавшим заявку, проверяю по cookie)",
  })
  @ApiResponse({ status: 200, type: [Application] })
  @Get("cancel/:id")
  async cancelApplication(@Req() request, @Param("id") id: number) {
    if (request.cookies["applicationsId"]) {
      return JSON.parse(request.cookies["applicationsId"]).find(
        (el) => String(el) === String(id)
      )
        ? await this.applicationService.cancelApplication(id)
        : new UnauthorizedException({
            message: "У вас нет прав для отмены этой заявки",
          });
    }
    throw new UnauthorizedException({
      message: "У вас нет прав для отмены этой заявки",
    });
  }
}
