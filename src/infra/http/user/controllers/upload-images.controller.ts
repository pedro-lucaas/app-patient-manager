import { Controller, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { UploadImagesUseCase } from "@application/use-cases/users/upload-images";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id/images')
export class UploadImagesController {
  constructor(
    private readonly uploadImages: UploadImagesUseCase,
  ) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Param('id') appointmentId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const { uploadedFiles } = await this.uploadImages.execute({
        appointmentId,
        files,
      });

      const viewData = uploadedFiles.map((file) => ({
        name: file.fileName,
        url: file.fileUrl,
      }));

      const data = viewData.length > 1 ? viewData : viewData[0];

      if (viewData) {
        return {
          message: "Images uploaded successfully",
          data,
        };
      }

    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
