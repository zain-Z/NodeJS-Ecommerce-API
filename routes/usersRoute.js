import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from '../controllers/usersCtrl.js';
const usersRouter = express.Router();
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

usersRouter.post('/register', registerUserCtrl);
usersRouter.post('/login', loginUserCtrl);
usersRouter.get('/profile', isLoggedIn, getUserProfileCtrl);

export default usersRouter;
