import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDb
);
router.get('/', CategoryController.getAllData);
router.get('/:id', CategoryController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateFromDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteFromDb
);

export const categoryRoutes = router;
