import { PrismaClient } from "@prisma/client";
import { IReviewRepository } from "./IReview.repository";
import { CreateReviewDTO } from "@/domain/dto/Review.dto";

export class ReviewRepository implements IReviewRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async create(candidate_id: string, payload: CreateReviewDTO) {}
}