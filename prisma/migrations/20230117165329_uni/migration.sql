/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `appointments_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileUrl]` on the table `appointments_files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_files_fileName_key" ON "appointments_files"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_files_fileUrl_key" ON "appointments_files"("fileUrl");
