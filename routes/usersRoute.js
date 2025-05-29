import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl, updateUserShippingAddressCtrl } from '../controllers/usersCtrl.js';
const usersRouter = express.Router();
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

usersRouter.post('/register', registerUserCtrl);
usersRouter.post('/login', loginUserCtrl);
usersRouter.get('/profile', isLoggedIn, getUserProfileCtrl);
usersRouter.put('/update/shipping', isLoggedIn, updateUserShippingAddressCtrl);

export default usersRouter;
