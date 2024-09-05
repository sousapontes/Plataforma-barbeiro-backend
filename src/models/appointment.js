module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      timestamp: true
    }
  }, {});

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.Barber, { foreignKey: 'barberId' });
    Appointment.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
  };

  return Appointment;
};
