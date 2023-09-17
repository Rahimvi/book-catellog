import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Category successfully',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all Category successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

//Update Category

const updateFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CategoryService.updateFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category update successfully',
    data: result,
  });
});

//Delete Category

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category delete successfully',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDb,
  getAllData,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
