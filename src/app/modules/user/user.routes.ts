import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllData);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateFromDb);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteFromDb);

export const userRoutes = router;
