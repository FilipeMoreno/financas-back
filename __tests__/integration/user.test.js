import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // CADASTRO DE USUÁRIOS

  it('Deve criptografar a senha do usuário cadastrado', async () => {
    const user = await factory.create('Usuario', {
      senha: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.senha_hash);

    expect(compareHash).toBe(true);
  });

  it('Deve cadastrar um novo usuário', async () => {
    const user = await factory.attrs('Usuario');

    const response = await request(app).post('/auth/register').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('Não deve cadastrar um usuário sem o nome', async () => {
    const user = await factory.attrs('Usuario', {
      nome: null,
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Não deve cadastrar um usuário sem o email', async () => {
    const user = await factory.attrs('Usuario', {
      email: null,
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Não deve cadastrar um usuário sem a senha', async () => {
    const user = await factory.attrs('Usuario', {
      senha: null,
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Não deve cadastrar um usuário com email duplicado', async () => {
    const user = await factory.attrs('Usuario', {
      email: 'email@fake.com',
    });

    await request(app).post('/auth/register').send(user);

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Não deve cadastrar um usuário com senhas diferentes', async () => {
    const user = await factory.attrs('Usuario', {
      senha: '123456',
      confirmarsenha: '1234567',
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Não deve cadastrar um usuário sem a confirmação de senha', async () => {
    const user = await factory.attrs('Usuario', {
      senha: '123456',
      confirmarsenha: null,
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(400);
  });

  it('Deve dar erro ao tentar enviar "nivel" ao corpo da req', async () => {
    const user = await factory.attrs('Usuario', {
      nivel: 0,
    });

    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(401);
  });

  // ATUALIZAÇÃO DE USUÁRIOS
});
