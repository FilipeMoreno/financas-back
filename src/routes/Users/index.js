// import Brute from 'express-brute';
// import BruteRedis from 'express-brute-redis';

import SessionController from '../../app/controllers/SessionController';
import UserController from '../../app/controllers/UserController';

// VALIDAÇÕES
import validateSessionCreate from '../../app/validators/Session/SessionCreate';
import validateForgotPasswordCreate from '../../app/validators/User/forgotPasswordCreate';
import validateResetPasswordCreate from '../../app/validators/User/resetPasswordCreate';
import validateUserCreate from '../../app/validators/User/UserCreate';
import validateUserUpdate from '../../app/validators/User/UserUpdate';

export default (routes, auth) => {
  // if (process.env.NODE_ENV !== 'development') {
  //   const bruteStore = new BruteRedis({
  //     host: process.env.REDIS_HOST,
  //     port: process.env.REDIS_PORT,
  //   });

  //   const bruteForce = new Brute(bruteStore);
  // }

  routes.post('/auth/register', validateUserCreate, UserController.createUser);

  routes.post(
    '/auth/resend-email',
    validateForgotPasswordCreate,
    UserController.resendEmailForgotPassword
  );

  routes.post(
    '/forgot-password',
    validateForgotPasswordCreate,
    UserController.forgotPassword
  );

  routes.post(
    '/auth/reset-password',
    validateResetPasswordCreate,
    UserController.resetPassword
  );

  routes.post(
    '/auth/login',
    validateSessionCreate,
    SessionController.createSession
  );

  // Routes Private

  routes.put('/user', auth, validateUserUpdate, UserController.updateUser);

  routes.get('/user/profile', auth, UserController.showUser);

  // routes.get('/api/v1/auth/nlogin', nLoginController.checkRegister);
};
