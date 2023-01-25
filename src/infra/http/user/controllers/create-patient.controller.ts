import { CreatePatientUseCase } from "@application/use-cases/users/create-patient";
import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { CreatePatientBody } from "../dtos/create-patient-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient')
export class CreatePatientController {
  constructor(
    private readonly createPatient: CreatePatientUseCase,
  ) { }

  @Post()
  async handle(
    @Body() body: CreatePatientBody,
    @Req() req: any,
  ) {
    const { name, email, phone, sex, birthDate, comments, ...props } = body;
    const userId = req.user.sub;
    try {
      await this.createPatient.execute({
        userId,
        name,
        email,
        phone,
        sex,
        birthDate: new Date(birthDate),
        comments,
      }, props)
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}