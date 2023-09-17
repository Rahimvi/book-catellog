import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDb
);
router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateFromDb);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDb);

export const bookRoutes = router;
