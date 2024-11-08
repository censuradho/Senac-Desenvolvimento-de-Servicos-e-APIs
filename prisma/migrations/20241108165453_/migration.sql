-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nps" INTEGER NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "jobLink" TEXT,
    "candidate_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reviews" ("candidate_id", "category", "company_id", "createdAt", "description", "id", "jobLink", "jobTitle", "nps", "updatedAt") SELECT "candidate_id", "category", "company_id", "createdAt", "description", "id", "jobLink", "jobTitle", "nps", "updatedAt" FROM "reviews";
DROP TABLE "reviews";
ALTER TABLE "new_reviews" RENAME TO "reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
