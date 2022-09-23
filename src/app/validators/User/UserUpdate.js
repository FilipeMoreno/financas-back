import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
      new_password: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      confirm_password: Yup.string().when(
        'new_password',
        (new_password, field) =>
          new_password
            ? field.required().oneOf([Yup.ref('new_password')])
            : field
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
