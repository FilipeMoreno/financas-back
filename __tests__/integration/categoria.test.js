import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Categorias', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve criar uma categoria', async () => {
    const categoria = await factory.create('Categoria');

    expect(categoria).toHaveProperty('id');
  });

  it('Não deve criar uma categoria com o código duplicado', async () => {
    const categoria = await factory.attrs('Categoria', {
      codigo: 1,
    });

    await request(app).post('/categoria').send(categoria);
    const response = await request(app).post('/categoria').send(categoria);

    expect(response.status).toBe(400);
  });
});
