module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});

  Customer.associate = function(models) {
    Customer.hasMany(models.Appointment, { foreignKey: 'customerId' });
  };

  return Customer;
};
