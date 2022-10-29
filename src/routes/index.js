import { Router } from 'express';

// Middlewares
import authMiddleware from '../app/middleware/auth';

// Pastas das Rotas

import AccountsRoute from './Accounts';
import AccountTypesRoute from './AccountsTypes';
import BanksRoute from './Banks';
import CategoriesRoute from './Categories';
import DashboardRoute from './Dashboard';
import DespesasRoute from './Despesas';
import ReceitasRoute from './Receitas';
import RelatoriosRoute from './Relatorios';
import TransacoesRoute from './Transactions';
import UsersRoute from './Users';

const routes = new Router();

UsersRoute(routes, authMiddleware);
CategoriesRoute(routes, authMiddleware);
BanksRoute(routes, authMiddleware);
AccountTypesRoute(routes, authMiddleware);
AccountsRoute(routes, authMiddleware);
DashboardRoute(routes, authMiddleware);
DespesasRoute(routes, authMiddleware);
TransacoesRoute(routes, authMiddleware);
ReceitasRoute(routes, authMiddleware);
RelatoriosRoute(routes, authMiddleware);

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
