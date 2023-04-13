module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      nullable: false,
    },
    uid: {
      type: Sequelize.STRING,
      nullable: false,
    },
    encoding_code: {
      type: Sequelize.STRING,
      nullable: false,
    },
    encoding_type: {
      type: Sequelize.STRING,
      nullable: false,
    },
  })
  return User
}
