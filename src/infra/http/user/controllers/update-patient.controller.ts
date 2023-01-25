import { UpdatePatientUseCase } from "@application/use-cases/users/update-patient";
import { Body, Controller, HttpException, HttpStatus, Param, Patch, UseGuards } from "@nestjs/common";
import { UpdatePatientBody } from "../dtos/update-patient-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/:id')
export class UpdatePatientController {
  constructor(
    private readonly updatePatient: UpdatePatientUseCase,
  ) { }

  @Patch()
  async handle(
    @Param('id') id: string,
    @Body() body: UpdatePatientBody) {
    const { name, email, phone, sex, birthDate, comments, ...props } = body;
    try {

      await this.updatePatient.execute({
        patientId: id,
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