import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: 401,
      success: false,
      type: 'Authentication.Token.NotFound',
      error: 'Token não encontrado.',
    });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (e) {
    return res.status(401).json({
      status: 401,
      success: false,
      type: 'Invalid.Authentication.Token',
      error: 'Token inválido.',
    });
  }
};
