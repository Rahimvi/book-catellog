import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getUserProfileById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        password: false, // Exclude password for security
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
      },
    });
    return user;
  } catch (error: any) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${error.message}`);
  }
};

export const ProfileService = {
  getUserProfileById,
};
