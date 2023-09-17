import { Order, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Prisma.OrderCreateInput): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });

  return result;
};

const getAllData = async () => {
  const result = await prisma.order.findMany();
  return result;
};

const getOrdersForSpecificCustomer = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const getOrderByOrderId = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const OrderService = {
  insertIntoDb,
  getAllData,
  getOrdersForSpecificCustomer,
  getOrderByOrderId,
};
