const { DataTypes } = require('sequelize');
// const { DataTypes } = require('sequelize/types');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull : false
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    healthscore:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    steps:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false
  }
  );
};
