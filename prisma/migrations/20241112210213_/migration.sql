-- CreateTable
CREATE TABLE "invitesToReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "validDays" INTEGER NOT NULL,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employer_id" TEXT NOT NULL,
    CONSTRAINT "invitesToReview_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL DEFAULT 'Unknow',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CANDIDATE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invite_id" TEXT,
    "nps" INTEGER NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "jobLink" TEXT,
    "candidate_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_invite_id_fkey" FOREIGN KEY ("invite_id") REFERENCES "invitesToReview" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reviews_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "avatar" TEXT,
    "site" TEXT,
    "type" TEXT NOT NULL DEFAULT 'OTHER',
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "employers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "access_level" TEXT NOT NULL DEFAULT 'EDITOR',
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "employers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_invite_id_key" ON "reviews"("invite_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "employers_user_id_key" ON "employers"("user_id");
