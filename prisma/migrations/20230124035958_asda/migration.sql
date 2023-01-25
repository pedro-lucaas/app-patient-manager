-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patient_attributes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" TEXT NOT NULL,
    "name" TEXT,
    "value" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "patient_attributes_name_fkey" FOREIGN KEY ("name") REFERENCES "attributes" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient_attributes" ("id", "name", "patientId", "value") SELECT "id", "name", "patientId", "value" FROM "patient_attributes";
DROP TABLE "patient_attributes";
ALTER TABLE "new_patient_attributes" RENAME TO "patient_attributes";
CREATE UNIQUE INDEX "patient_attributes_patientId_name_key" ON "patient_attributes"("patientId", "name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
