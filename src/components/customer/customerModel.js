const { sequelize, DataTypes } = require('../../config/database.config');

const customer = sequelize.define('KHACH_HANG', {
  // Schema attributes are defined here
  id: {
    field: 'MA_KHACH_HANG',
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: { field: 'HO_TEN', type: DataTypes.STRING },
  phone: { field: 'DIEN_THOAI', type: DataTypes.STRING },
  address: { field: 'DIA_CHI', type: DataTypes.STRING},
  email: { field: 'EMAIL', type: DataTypes.STRING }
}, { timestamps: false, freezeTableName: true });

customer.sync()
    .then(() => console.log('The table for the Customer model was just created!'))
    .catch((error) => console.error(error.message))

// Create customer model in db
module.exports = customer;