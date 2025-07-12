const { sequelize } = require('./testServer');

module.exports = async () => {
  await sequelize.sync({ force: true });
};