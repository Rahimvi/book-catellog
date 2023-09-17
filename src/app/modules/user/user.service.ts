import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllData = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateFromDb = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

//Delete User
const deleteFromDb = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  getAllData,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
