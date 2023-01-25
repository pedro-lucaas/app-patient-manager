import { CancelPatientUseCase } from "@application/use-cases/users/cancel-pacient";
import { Body, Controller, HttpException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { CancelPatientBody } from "../dtos/cancel-patient-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/cancel')
export class CancelPatientController {
  constructor(
    private readonly addPatient: CancelPatientUseCase,
  ) { }

  @Put()
  async handle(@Body() body: CancelPatientBody) {
    const { patientId } = body;
    try {
      await this.addPatient.execute({ patientId })
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}