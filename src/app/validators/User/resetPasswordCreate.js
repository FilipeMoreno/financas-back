import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required('O email é obrigatório.'),
      token: Yup.string().required('O token é obrigatório.'),
      password: Yup.string().min(6).required('A senha é obrigatória.'),
      confirm_password: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'A validação falhou.', message: e.inner });
  }
};
