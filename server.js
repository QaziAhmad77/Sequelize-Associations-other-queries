const express = require('express');
// const Contact = require('./models/contact');
// const Employee = require('./models/employee');
require('./models/index');
const app = express();
app.use(express.json());
const port = 3000;


const employeeRouter = require('./routes/employee');
const contactRouter = require('./routes/contact');

app.use('/employees', employeeRouter);
app.use('/contacts', contactRouter);

// Contact.sync({ force: true});
// Employee.sync({ force: true});

// Synchronizing all models at once
// You can use sequelize.sync() to automatically synchronize all models. Example:
// await sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");
// await sequelize.drop();
// console.log("All tables dropped!");
app.use((req, res) => {
    return res.status(404).send("Error 404, Route not found");
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})