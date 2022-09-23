import Mail from '../../lib/Mail';

class CadastroMail {
  get key() {
    return 'CadastroMail';
  }

  async handle({ data }) {
    const { usuario, cadastroUrl } = data;

    console.log('Fila CadastroMail executou');

    await Mail.sendMail({
      to: `${usuario} <${usuario}>`,
      subject: 'Crie sua conta!',
      template: 'pre-cadastro',
      context: {
        email: usuario,
        url: cadastroUrl,
      },
    });
  }
}

export default new CadastroMail();
