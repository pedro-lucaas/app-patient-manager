import { Controller, Get, HttpException, Param, Query, UseGuards } from "@nestjs/common";
import { ParseIntPipe } from "@infra/utils/pipes/parse-int.pipe";
import { FindPatientUseCase } from "@application/use-cases/users/find-patient";
import { PatientViewModel } from "../view-models/patient-view-model";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/:id')
export class FindPatientController {
  constructor(
    private findPatient: FindPatientUseCase,
  ) { }

  @Get()
  async handle(@Param('id') id: string) {
    try {
      const { patient } = await this.findPatient.execute({ id });
      return PatientViewModel.toHTTP(patient);
    } catch (error) {

      throw new HttpException("Patient not found", 404);
    }
  }
}