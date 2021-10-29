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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    spoonacularScore: {
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.TEXT
    },
    analyzedInstructions: {
      type: DataTypes.JSON
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};

