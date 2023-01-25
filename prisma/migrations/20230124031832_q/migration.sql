-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_config" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "lunchTimeStart" DATETIME,
    "lunchTimeDuration" INTEGER,
    CONSTRAINT "user_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_config" ("lunchTimeDuration", "lunchTimeStart", "userId") SELECT "lunchTimeDuration", "lunchTimeStart", "userId" FROM "user_config";
DROP TABLE "user_config";
ALTER TABLE "new_user_config" RENAME TO "user_config";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
