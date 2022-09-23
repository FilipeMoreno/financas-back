import Usuario from '../../src/app/models/Users';
import truncate from '../util/truncate';

describe('Auth', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve se autenticar', async () => {
    const user = await Usuario.create({
      name: 'Financas',
      email: 'financas@filipemoreno.com.br',
      password: '123123',
    });

    expect(user.email).toBe('financas@filipemoreno.com.br');
  });
});
