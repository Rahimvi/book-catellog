import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constans';
import { BookService } from './book.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book create successfully!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

//Update Book

const updateFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book update successfully',
    data: result,
  });
});

//Delete Book

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book delete successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDb,
  getAllFromDB,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
