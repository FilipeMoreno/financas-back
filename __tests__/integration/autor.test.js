import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Autores', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve criar um autor', async () => {
    const autor = await factory.create('Autor');

    expect(autor).toHaveProperty('id');
  });
});
