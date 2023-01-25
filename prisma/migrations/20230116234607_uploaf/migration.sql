/*
  Warnings:

  - You are about to drop the column `createdAt` on the `appointments_files` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `appointments_files` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `appointments_files` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `appointments_files` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `appointments_files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileUrl" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    CONSTRAINT "appointments_files_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments_files" ("fileUrl", "id") SELECT "fileUrl", "id" FROM "appointments_files";
DROP TABLE "appointments_files";
ALTER TABLE "new_appointments_files" RENAME TO "appointments_files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
