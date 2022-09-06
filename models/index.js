const { Sequelize, DataTypes } = require('sequelize');
const employee = require('./employee');
const contact = require('./contact');

const sequelize = new Sequelize("practice","root","",{
    host: "localhost",
    // logging: false, This will remove all the queries from the terminal when we are running .
    logging: false,
    dialect: "mysql"
});

try{
    sequelize.authenticate();
    console.log("Connected to database successfully");
}catch(error){
    console.log("Failed to connect to database",error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize,DataTypes);
db.employee = require('./employee')(sequelize,DataTypes);
db.employeeContacts = require('./employeeContact')(sequelize,DataTypes,employee,contact);

// db.employee.hasOne(db.contact,{foreignKey: 'user_id', as: 'contactDetails'});  // if we write "userId" in models instead of user_id then no 
// db.employee.hasMany(db.contact,{foreignKey: 'user_id', as: 'contactDetails'});  
// db.contact.belongsTo(db.employee,{foreignKey: 'user_id', as: 'employeeDetails'}); // need of foreignKey

// db.employee.belongsToMany(db.contact, {through: 'employee_contact'});
// db.contact.belongsToMany(db.employee, {through: 'employee_contact'});
db.employee.belongsToMany(db.contact, {through: db.employeeContacts});
db.contact.belongsToMany(db.employee, {through: db.employeeContacts});

db.sequelize.sync({ force: false});
module.exports = db;