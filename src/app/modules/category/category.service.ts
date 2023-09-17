import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getAllData = async () => {
  const result = await prisma.category.findMany();
  return result;
};
const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateFromDb = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

//Delete faculty
const deleteFromDb = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  insertIntoDb,
  getAllData,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
