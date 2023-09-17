// profile.routes.ts
import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get('/:id', ProfileController.getUserProfile);

export const profileRoutes = router;
