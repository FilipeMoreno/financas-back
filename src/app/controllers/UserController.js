import crypto from 'crypto';
import fs from 'fs';
import { resolve } from 'path';

import Users from '../models/Users';

class UsuarioController {
  async createUser(req, res) {
    try {
      const userExist = await Users.findOne({
        where: { email: req.body.email },
      });

      const usernameExist = await Users.findOne({
        where: { username: req.body.username },
      });

      if (usernameExist) {
        return res.status(400).json({
          error: 'Já existe um usuário cadastrado com esse username.',
        });
      }

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário cadastrado com esse email.' });
      }

      const { id, name, username, email } = await Users.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      return res.json({ id, name, username, email });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao criar o registro.', message: e.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findByPk(req.userId);

      if (email !== user.email) {
        const userExists = await Users.findOne({ where: { email } });

        if (userExists) {
          return res
            .status(400)
            .json({ error: 'Já existe um usuário cadastrado com esse email.' });
        }
      }

      if (password && !(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha atual incorreta.' });
      }

      await user.update(req.body);

      const { id, nome } = await Users.findByPk(req.userId);

      return res.json({
        id,
        nome,
        email,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao atualizar o registro.', message: e.message });
    }
  }

  async showUser(req, res) {
    try {
      const usuario = await Users.findByPk(req.userId, {
        attributes: {
          exclude: ['password_hash', 'updatedAt'],
        },
      });

      if (usuario === null) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(usuario);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro na busca do usuário.',
        message: e.message,
      });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const usuario = await Users.findOne({ where: { email } });

      if (!usuario) {
        res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const userID = usuario.id;

      const checkToken = await UsersTokens.findOne({
        where: { user_id: userID, type: 'forgotpassword', used: false },
      });

      if (checkToken) {
        if (checkToken.expired_at > new Date()) {
          // fazer função reenviar email
          return res.status(400).json({
            error:
              'Já existe um pedido de recuperação para essa conta. Verifique seu email.',
          });
        }
        await UsersTokens.destroy({ where: { id: checkToken.id } });
      }

      const token = crypto.randomBytes(24).toString('HEX');

      const expiracao = new Date();
      expiracao.setHours(expiracao.getHours() + 1);

      await UsersTokens.create({
        token,
        type: 'forgotpassword',
        user_id: userID,
        expired_at: expiracao,
      });

      const resetPasswordUrl = `${process.env.FRONT_URL}/admin/auth/reset-password?token=${token}&email=${usuario.email}`;

      await Queue.add(ForgotPasswordMail.key, {
        usuario,
        resetPasswordUrl,
      });

      return res.json({
        sucess:
          'Um email com as instruções para a recuperação de senha foi enviado.',
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao tentar recuperar a senha.',
        message: e.message,
      });
    }
  }

  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });
      const getToken = await UsersTokens.findOne({
        where: { token, type: 'forgotpassword', used: false },
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      if (!getToken) {
        return res.status(400).json({ error: 'Token inserido é inválido.' });
      }

      if (await user.checkPassword(req.body.password)) {
        return res
          .status(401)
          .json({ error: 'Você não pode utilizar a mesma senha.' });
      }

      const now = new Date();

      if (now > getToken.expired_at) {
        return res.status(400).json({ error: 'Token expirado.' });
      }

      user.password = password;
      await user.save();

      getToken.used = true;
      await getToken.save();

      await Queue.add(ResetPasswordEmail.key, {
        user,
      });

      return res.json({ sucess: 'Senha alterada com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao tentar resetar a senha.',
        message: e.message,
      });
    }
  }

  async resendEmailForgotPassword(req, res) {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });
    const now = new Date();

    try {
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const getToken = await UsersTokens.findOne({
        where: { user_id: user.id, type: 'forgotpassword', used: false },
      });

      if (!getToken) {
        return res.status(400).json({
          error:
            'Não foi encontrado um pedido de recuperação de senha para essa conta.',
        });
      }

      const newExpire = new Date();
      newExpire.setHours(now.getHours() + 1);

      getToken.expired_at = newExpire;
      await getToken.save();

      const resetPasswordUrl = `${process.env.FRONT_URL}/admin/auth/reset-password?token=${getToken.token}&email=${user.email}`;

      await Queue.add(ResendForgotPasswordMail.key, {
        user,
        resetPasswordUrl,
      });

      return res.json({ sucess: 'O email foi reenviado.' });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }
}
export default new UsuarioController();
