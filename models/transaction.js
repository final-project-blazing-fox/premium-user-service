'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PremiumUser, {
        foreignKey: 'transacion_id'
      })
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('waiting payment', 'completed', 'cancelled', 'failed'),
      defaultValue: 'waiting payment'
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};