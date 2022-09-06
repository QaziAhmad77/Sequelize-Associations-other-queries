const { sequelize } = require(".");

module.exports = (sequelize, DataTypes, employee, contact) => {
const employeeContacts = sequelize.define('employee_contacts', {
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: employee, // 'employee' would also work
        key: 'id'
      }
    },
    contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: contact, // 'contact' would also work
        key: 'id'
      }
    },
  },{
    timestamps: false   // createdAt and updatedAt will not be created with tables
  });
  return employeeContacts;
}