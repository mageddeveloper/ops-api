const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePasswords };
