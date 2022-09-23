import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Users from '../models/Users';

class SessionController {
  async createSession(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await Users.findOne({
        where: { email },
      });

      if (!usuario) {
        return res.status(401).json({
          status: 401,
          success: false,
          type: 'Session.Accounts.Unauthorized.Session',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Email e/ou senha inválidos.',
          instance: '/api/v1/auth/login',
        });
      }

      if (!(await usuario.checkPassword(password))) {
        return res.status(401).json({
          status: 401,
          success: false,
          type: 'Session.Accounts.Unauthorized.Session',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Email e/ou senha inválidos.',
          instance: '/auth/login',
        });
      }

      const { id, name } = usuario;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {}),
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Session.Accounts.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na autenticação.',
        details: e.message,
        instance: '/auth/login',
      });
    }
  }
}
export default new SessionController();
