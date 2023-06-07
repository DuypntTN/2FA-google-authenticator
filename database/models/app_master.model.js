module.exports = (sequelize, Sequelize) => {
  const AppMaster = sequelize.define('app_master', {
    appId: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      nullable: false,
      unique: true,
    },
    appName: {
      type: Sequelize.STRING,
      nullable: false,
      defaultValue: 'Khởi tạo',
    },
  })
  return AppMaster
}
