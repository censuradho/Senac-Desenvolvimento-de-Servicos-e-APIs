import { PrismaClient } from "@prisma/client";

export class InviteToReviewRepository implements InviteToReviewRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

}