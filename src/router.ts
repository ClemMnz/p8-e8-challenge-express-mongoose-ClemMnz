import express from 'express';
import mainController from './controllers/mainController';
import authController from './controllers/authController';
import authMiddleware from './middlewares/authMiddleware';
const router: express.Router = express.Router();

// on définit des routes
router.route('/').get(mainController.index);
router.route('/login').get(authController.getLogin).post(authController.postLogin);
router.get('/logout', authController.logout);
router.get('/home',authMiddleware, mainController.home);
router.route('/signup').get(authController.getSignUp).post(authController.postSignUp);


export default router;