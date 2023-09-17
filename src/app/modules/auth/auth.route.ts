import express from 'express';
import { AuthController } from './auth.controller';
const router = express.Router();

// router.get('/:id', AdminController.getSingleAdmin);
router.post('/signup', AuthController.createUser);
router.post('/signin', AuthController.loginUser);

router.post('/refresh-token', AuthController.refreshToken);

// router.delete('/:id', AdminController.deleteAdmin);

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdmin),
//   AdminController.updateAdmin
// );

export const authRoutes = router;
