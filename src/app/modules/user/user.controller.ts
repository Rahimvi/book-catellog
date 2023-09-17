import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

//Update User

const updateFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  });
});

//Delete User

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User delete successfully',
    data: result,
  });
});

export const UserController = {
  getAllData,
  updateFromDb,
  deleteFromDb,
  getByIdFromDB,
};
