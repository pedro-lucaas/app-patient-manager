import { Controller, HttpException, HttpStatus, Param, Delete, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { DeleteImageUseCase } from "@application/use-cases/users/delete-image";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id/image/:imageId')
export class DeleteImageController {
  constructor(
    private readonly deleteImage: DeleteImageUseCase,
  ) { }

  @Delete()
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Param('id') appointmentId: string,
    @Param('imageId') imageId: string,
  ) {
    try {
      // string to number
      const imageIdNumber = Number(imageId);
      await this.deleteImage.execute({
        appointmentId,
        imageId: imageIdNumber,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
