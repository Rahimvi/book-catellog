import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './reviewAndRating.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Create successfully',
    data: result,
  });
});

export const ReviewController = {
  insertIntoDb,
};
