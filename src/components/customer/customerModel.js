const { sequelize, DataTypes } = require('../../config/database.config');

const customer = sequelize.define('KHACH_HANG', {
  // Schema attributes are defined here
  MA_KHACH_HANG: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  HO_TEN: { type: DataTypes.STRING },
  DIEN_THOAI: { type: DataTypes.STRING },
  DIA_CHIA: DataTypes.STRING,
  EMAIL: DataTypes.STRING
}, { timestamps: false});

customer.sync()
    .then(() => console.log('The table for the Customer model was just created!'))
    .catch((error) => console.error(error.message))

// Create customer model in db
module.exports = customer;