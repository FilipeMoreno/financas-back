import Mail from '../../lib/Mail';

class ResetPasswordEmail {
  get key() {
    return 'ResetPasswordEmail';
  }

  async handle({ data }) {
    const { user } = data;

    console.log('Fila ResetPasswordEmail executou.');

    await Mail.sendMail({
      to: `${user.nome} <${user.email}>`,
      subject: 'Sua senha foi redefinida!',
      template: 'reset-password',
      context: {
        email: user.email,
        nome: user.nome,
      },
    });
  }
}

export default new ResetPasswordEmail();
