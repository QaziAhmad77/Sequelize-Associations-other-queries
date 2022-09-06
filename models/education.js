const moment = require('moment');
module.exports = (sequelize,DataTypes) => {
const Education = sequelize.define("education",{
    school: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeId: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // Other model options go here
    // tableName: "users"
    // timestamps: false
})

Education.beforeCreate(async(education) => {
    education.dataValues.createdAt = moment().unix();
    education.dataValues.updatedAt = moment().unix();
  });
Education.beforeUpdate(async(education) => {
    education.dataValues.updatedAt = moment().unix();
  });
return Education;
}