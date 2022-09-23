export default {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
  refreshExpires: process.env.AUTH_REFRESH_EXPIRES,
  refreshSecret: process.env.AUTH_REFRESH_SECRET,
};
