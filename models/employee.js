const moment = require("moment");
module.exports = (sequelize,DataTypes)=>{
const Employee = sequelize.define("employees",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
        const rawValue = this.getDataValue('name');
        return rawValue ? 'Mr. ' +rawValue.toUpperCase() : null ;  // will add Mr in first and Capatilize all the letters
        },
        set(value) {
            this.setDataValue('name', value+ ', Pakistan , Peshawar'); // will add Pakistan, Peshawar in the last
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        // type: DataTypes.DATE,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        // type: DataTypes.DATE,
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    paranoid: true,
    deletedAt: 'soft_delete'
})
    Employee.beforeCreate(async(employee) => {
        employee.dataValues.createdAt = moment().unix();
        employee.dataValues.updatedAt = moment().unix();
      });
      Employee.beforeUpdate(async(employee) => {
        employee.dataValues.updatedAt = moment().unix();
      });
    return Employee;
}

