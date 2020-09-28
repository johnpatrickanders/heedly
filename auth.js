const jwt = require("jsonwebtoken");
// const { jwtConfig } = require("./config");

// const { secret, expiresIn } = jwtConfig;

const { User } = require('./db/models');

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

const getUserToken = async (user) => {
  const token = await jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn })
  return token;
}

const getUserFromToken = async (token) => {
  try {
    const payload = jwt.verify(
      token,
      secret
    );
    return await User.findByPk(payload.id);
  } catch (err) {
    return null;
  }
}


module.exports = {
  getUserToken,
  getUserFromToken
};
