const {DataTypes} = require('sequelize')
// const { DataTypes } = require('sequelize/types')

module.exports = (sequelize) => {
    sequelize.define( "Diets", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
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
 )
}