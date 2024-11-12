-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invitesToReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "validDays" INTEGER NOT NULL,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employer_id" TEXT NOT NULL,
    CONSTRAINT "invitesToReview_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_invitesToReview" ("answered", "createdAt", "employer_id", "id", "validDays") SELECT "answered", "createdAt", "employer_id", "id", "validDays" FROM "invitesToReview";
DROP TABLE "invitesToReview";
ALTER TABLE "new_invitesToReview" RENAME TO "invitesToReview";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
