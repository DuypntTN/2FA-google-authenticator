module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      nullable: false,
    },
    uid: {
      type: Sequelize.STRING,
      nullable: false,
      unique: true,
    },
    encoding_code: {
      type: Sequelize.STRING,
    },
    encoding_type: {
      type: Sequelize.STRING,
    },
    encoding_type: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      nullable: false,
    },
  })
  return User
}
