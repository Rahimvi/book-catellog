import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //check user exist

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //Match Password

  if (
    isUserExist.password &&
    !(await prisma.user.findFirst({
      where: {
        password: password,
      },
    }))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not match');
  }

  //access token and refresh token

  // const { id: userId, role } = isUserExist;
  const { email: emailId, password: passId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { emailId, passId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { emailId, passId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { emailId } = verifiedToken;

  const isUserExist = await prisma.user.findUnique(emailId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // new access token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      password: isUserExist.password,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  createUser,
};
