import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
  });

  return result;
};

export const ReviewService = {
  insertIntoDb,
};
