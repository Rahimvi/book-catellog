import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Create successfully!',
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetch successfully',
    data: result,
  });
});
const getOrdersForSpecificCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await OrderService.getOrdersForSpecificCustomer(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order for Specific Customer  fetch successfully',
      data: result,
    });
  }
);
const getSingleOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const userRole = req.user?.role; // Extract the user's role from the decoded token
    const userId = req.user?.userId; // Extract the user's ID from the decoded token

    if (!userRole || !userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized: Access denied',
      });
    }

    // Check if the user is an admin (no further checks required)
    if (userRole === 'admin') {
      const order = await OrderService.getOrderByOrderId(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Order fetched successfully',
        data: order,
      });
    }

    // If the user is a customer, verify that the order belongs to them
    const order = await OrderService.getOrderByOrderId(orderId);

    if (!order || order.userId !== userId) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Unauthorized: Access denied',
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order fetched successfully',
      data: order,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const OrderController = {
  insertIntoDb,
  getAllData,
  getOrdersForSpecificCustomer,
  getSingleOrderById,
};
