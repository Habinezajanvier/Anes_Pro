import { Router } from 'express';
import userController from '../../controller/users/email';
import { loginValidation, signupValidation } from '../../middlewares/validation';

const userRouter = new Router();

userRouter
  .post('/signup', signupValidation, userController.userSignup)
  .post('/login', loginValidation, userController.userLogin);

export default userRouter;
