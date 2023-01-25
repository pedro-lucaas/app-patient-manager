-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attributes" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT
);
INSERT INTO "new_attributes" ("name", "tag") SELECT "name", "tag" FROM "attributes";
DROP TABLE "attributes";
ALTER TABLE "new_attributes" RENAME TO "attributes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
