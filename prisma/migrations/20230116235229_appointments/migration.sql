/*
  Warnings:

  - You are about to drop the column `scheduledDate` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `status` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `appointments_files` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "appointments_status" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "initDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "canceledAt" DATETIME,
    CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_status_fkey" FOREIGN KEY ("status") REFERENCES "appointments_status" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("canceledAt", "createdAt", "endDate", "id", "initDate", "patientId", "updatedAt") SELECT "canceledAt", "createdAt", "endDate", "id", "initDate", "patientId", "updatedAt" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE TABLE "new_appointments_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    CONSTRAINT "appointments_files_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments_files" ("appointmentId", "fileUrl", "id") SELECT "appointmentId", "fileUrl", "id" FROM "appointments_files";
DROP TABLE "appointments_files";
ALTER TABLE "new_appointments_files" RENAME TO "appointments_files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
