import express from 'express';
import { ReviewController } from './reviewAndRating.controller';

const router = express.Router();

router.post('/', ReviewController.insertIntoDb);

export const reviewRoutes = router;
