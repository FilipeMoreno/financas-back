import Mail from '../../lib/Mail';

class ResendForgotPasswordMail {
  get key() {
    return 'ResendForgotPasswordMail';
  }

  async handle({ data }) {
    const { user, resetPasswordUrl } = data;

    console.log('Fila ResendForgotPasswordMail executou');

    await Mail.sendMail({
      to: `${user.nome} <${user.email}>`,
      subject: 'Recuperação de senha',
      template: 'forgot-password',
      context: {
        email: user.email,
        nome: user.nome,
        url: resetPasswordUrl,
      },
    });
  }
}

export default new ResendForgotPasswordMail();
