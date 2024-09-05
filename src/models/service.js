module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    duration: DataTypes.INTEGER
  }, {});

  Service.associate = function(models) {
    Service.hasMany(models.Appointment, { foreignKey: 'serviceId' });
  };

  return Service;
};
