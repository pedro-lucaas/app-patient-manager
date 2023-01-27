-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL DEFAULT '065-832-641.45',
    "caregiver" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "phone2" TEXT,
    "sex" TEXT NOT NULL,
    "civilStatus" TEXT,
    "birthDate" DATETIME NOT NULL,
    "schooling" TEXT,
    "addressCep" TEXT,
    "address" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "canceledAt" DATETIME,
    CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patients" ("birthDate", "canceledAt", "comments", "createdAt", "email", "id", "name", "phone", "sex", "updatedAt", "userId") SELECT "birthDate", "canceledAt", "comments", "createdAt", "email", "id", "name", "phone", "sex", "updatedAt", "userId" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
