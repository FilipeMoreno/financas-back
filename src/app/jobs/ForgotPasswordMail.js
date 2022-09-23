import Mail from '../../lib/Mail';

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  async handle({ data }) {
    const { usuario, resetPasswordUrl } = data;

    console.log('Fila ForgotPasswordMail executou');

    await Mail.sendMail({
      to: `${usuario.nome} <${usuario.email}>`,
      subject: 'Recuperação de senha',
      template: 'forgot-password',
      context: {
        email: usuario.email,
        nome: usuario.nome,
        url: resetPasswordUrl,
      },
    });
  }
}

export default new ForgotPasswordMail();
