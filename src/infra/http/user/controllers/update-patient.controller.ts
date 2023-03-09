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
    const {
      name,
      cpf,
      caregiver,
      email,
      phone,
      phone2,
      sex,
      civilStatus,
      birthDate,
      schooling,
      addressCep,
      address,
      number,
      complement,
      district,
      city,
      state,
      country,
      comments,
      ...props
    } = body;

    try {
      await this.updatePatient.execute({
        patientId: id,
        name,
        cpf,
        caregiver,
        email,
        phone,
        phone2,
        sex,
        civilStatus,
        birthDate: new Date(birthDate),
        schooling,
        addressCep,
        address,
        number,
        complement,
        district,
        city,
        state,
        country,
        comments,
      })
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}