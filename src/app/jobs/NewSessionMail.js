import Mail from '../../lib/Mail';

class NewSessionMail {
  get key() {
    return 'NewSessionMail';
  }

  async handle({ data }) {
    const { usuario, ipInfo, horario } = data;

    console.log('Fila NewSessionMail executou');

    await Mail.sendMail({
      to: `${usuario.nome} <${usuario.email}>`,
      subject: 'Novo login em sua conta CubeBox',
      template: 'new-session',
      context: {
        email: usuario.email,
        nome: usuario.nome,
        ip: ipInfo.ip,
        city: ipInfo.city,
        state: ipInfo.state,
        country: ipInfo.country,
        horario,
      },
    });
  }
}

export default new NewSessionMail();
