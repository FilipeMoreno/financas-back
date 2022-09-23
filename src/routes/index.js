import { Router } from 'express';

// Middlewares
import authMiddleware from '../app/middleware/auth';

// Pastas das Rotas

import UsersRoute from './Users';

const routes = new Router();

UsersRoute(routes, authMiddleware);

routes.get('*', (req, res) =>
  res.json({
    title: 'Finanças API',
    version: `${process.env.VERSION}`,
    status: 'OK',
    runtime_mode: `${process.env.NODE_ENV}`,
  })
);

export default routes;
