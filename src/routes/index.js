import { Router } from 'express';

// Middlewares
import authMiddleware from '../app/middleware/auth';

// Pastas das Rotas

import AccountsRoute from './Accounts';
import AccountTypesRoute from './AccountsTypes';
import BanksRoute from './Banks';
import CategoriesRoute from './Categories';
import UsersRoute from './Users';

const routes = new Router();

UsersRoute(routes, authMiddleware);
CategoriesRoute(routes, authMiddleware);
BanksRoute(routes, authMiddleware);
AccountTypesRoute(routes, authMiddleware);
AccountsRoute(routes, authMiddleware);

routes.get('*', (req, res) =>
  res.json({
    title: 'Finanças API',
    version: `${process.env.VERSION}`,
    success: true,
    status: 'OK',
    runtime_mode: `${process.env.NODE_ENV}`,
  })
);

export default routes;
