const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER
    },
    healthyFoofLevel: {
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.TEXT
    },
    stepByStep: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    createInDb: {
      type: DataTypes.STRING,
      defaultValue: true
    }
  });
};

// API Key: 8e4a19927203484c8aeb75b4af288b1e