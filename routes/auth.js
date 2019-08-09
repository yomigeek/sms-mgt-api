import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserValidation from '../middlewares/validations/UserValidation';
import CheckConflicts from '../middlewares/CheckConflicts';

const authRouter = Router();

authRouter.post(
  '/signup',
  UserValidation.signUpValidation,
  CheckConflicts.existingUser,
  AuthController.userSignUp
);

authRouter.post(
  "/login",
  UserValidation.loginValidation,
  AuthController.userLogin
);

export default authRouter;
