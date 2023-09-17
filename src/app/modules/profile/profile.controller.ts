// profile.controller.ts
import { Request, Response } from 'express';
import { ProfileService } from './profile.service';

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Extract the user's ID from the decoded token

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized: Access denied',
      });
    }

    const userProfile = await ProfileService.getUserProfileById(userId);

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'User profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: userProfile,
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

export const ProfileController = {
  getUserProfile,
};
