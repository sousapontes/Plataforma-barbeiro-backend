module.exports = (sequelize, DataTypes) => {
  const Barber = sequelize.define('Barber', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  
  Barber.associate = function(models) {
    Barber.hasMany(models.Appointment, { foreignKey: 'barberId' });
  };
  
  return Barber;
};
