let db = require('../models/index');
let Employee = db.employee;
let Contact = db.contact;
const {Sequelize, Op} = require("sequelize");
const employee = require('../models/employee');

module.exports = {
  postEmployee: async (req,res) =>{
    try {
      const {name,email,password} = req.body;
      if (!name || !email || !password) {
        return res.status(400).send("Required fields can't be empty");
      }
      const data = await Employee.create({
        name: name,
        email: email,
        password: password
      })
      res.status(200).send({data: data});
    } catch (err) {
      res.status(500).send("Something went wrong!!!");
    }
  },

  getAll: async (req,res)=>{
    try {
        const data = await Employee.findAll({});
        res.status(200).send({data});
    } catch (error) {
        console.log("Something went wrong");
        res.send("Something went wrong");
    }
  },

  getOne: async (req,res)=>{
    try {
        const {id} = req.params;
        const data = await Employee.findAll({
          where: {
            Id: id
          }
        });
        res.status(200).send({data});
    } catch (error) {
        res.send("Something went wrong");
    }
  },

  updated: async (req,res)=>{
    try {
      const {id} = req.params;
      const {name} = req.body;
      if(!name){
        res.status(400).send("Name is required");
      }
      const data = await Employee.update({
        name: name
      },{
        where: {id: id}
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  deleted: async (req, res)=>{
    try {
      const {id} = req.params;
      const data = await Employee.destroy({
        where: {id},
      })
      res.send("User deleted successfully");
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  deleteAll: async (req, res)=>{
    try {
      const data = await Employee.destroy({
        truncate: true,
      })
      res.send("User deleted successfully");
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },


  getQuery1: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ["name", "email", 
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']]
      })
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  getQuery2: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: {exclude: ["password"]}
        // attributes: {include: ["name"]}
      })
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  getQuery3: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        where: {
          authorId: 1,
          name: 'Mubahser'
        }
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  getQuery4: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        where: {
          [Op.or]: [
            { Id: 1 },
            { Id: 2 }
          ]
        }
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  getQuery5: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        where: {
          [Op.and]: [
            { id: id },
            { name: 'Mubasher' }
          ]
        }
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  getQuery6: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        order: [
          ['id','DESC']    // will get in descending order
        ]
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },



  // Find All queries

  finder1: async (req,res)=>{
    try {
      const data = await Employee.findAll({  // will get all 
        where: {
          name: 'Ahmad'
        }
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  finder2: async (req,res)=>{
    try {
      const data = await Employee.findOne({  // Will get only one
        where: {
          name: 'Ahmad'
        }
      });
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  finder3: async (req,res)=>{
    try {
      const data = await Employee.findByPk(3);
      res.status(200).send(data);
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  finder4: async (req,res)=>{
    try {
      const {count, rows} = await Employee.findAndCountAll({
        where: {name: "Ahmad"}
      });
      res.status(200).send({data: rows, count: count});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  validateUser: async (req,res)=>{
    try {
      const {name, email,password} = req.body;
      const data = await Employee.create({
        name: name,
        email: email,
        password: password
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  oneToOne1: async (req,res)=>{
    try {
      const {name, email, password} = req.body;
      const data = await Employee.create({
        name: name,
        email: email,
        password: password
      })
      if(data && data.id){
        const {permanent_address, current_address, father_name} = req.body;
        await Contact.create({
          permanent_address: permanent_address,
          current_address: current_address,
          father_name: father_name,
          user_id: data.id,
        })
      }
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  oneToOne2: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        where: {id: 2},
        include:Contact
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  oneToOne3: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          as: 'contactDetails',
          attributes: ['permanent_address','current_address','father_name']
        }],
        where: {id: 2}
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  oneToOne4: async (req,res)=>{
    try {
      const data = await Contact.findAll({
        attributes: ['permanent_address','current_address','father_name'],
        include: [{
          model: Employee,
          as: 'employeeDetails',
          attributes: ['name', 'email', 'password'],
        }],
        where: {id: 2}
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },


  // oneTomany

  oneToMany1: async (req,res)=>{
    try {
      const {name, email, password} = req.body;
      const data = await Employee.create({
        name: name,
        emial: email,
        password: password
      })
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  oneToMany2: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          as: 'contactDetails',
          attributes: ['permanent_address','current_address','father_name'],
        }],
        where: {id: 1}
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  oneToMany3: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          as: 'contactDetails',
          attributes: ['permanent_address','current_address','father_name'],
        }],
        where: {id: 2}
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  oneToMany4: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          as: 'contactDetails',
          attributes: ['permanent_address','current_address','father_name'],
        }],
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  oneToMany5: async (req,res)=>{
    try {
      const data = await Employee.findAll({
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          as: 'contactDetails',
          attributes: ['permanent_address','current_address','father_name'],
        }],
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },


    // This will behave like oneToOne
    oneToMany5: async (req,res)=>{
    try {
      const data = await Contact.findAll({   
        attributes: ['permanent_address','current_address','father_name'],
        include: [{
          model: Employee,
          as: 'employeeDetails',
          attributes: ['name', 'email', 'password'],
        }],
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  manyToMany1: async (req,res)=>{
    try {
      const {name, email, password} = req.body;
      const data = await Employee.create({
        name: name,
        email: email,
        password: password
      })
      if(data && data.id){
        const {permanent_address, current_address, father_name} = req.body;
        await Contact.create({
          permanent_address: permanent_address,
          current_address: current_address,
          father_name: father_name,
          user_id: data.id,
        })
      }
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  manyToMany2: async (req,res)=>{
    try {
      const data = await Employee.findAll({   
        attributes: ['name', 'email', 'password'],
        include: [{
          model: Contact,
          attributes: ['permanent_address','current_address','father_name'],
        }],
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  manyToMany3: async (req,res)=>{
    try {
      const data = await Contact.findAll({   
        attributes: ['permanent_address','current_address','father_name'],
        include: [{
          model: Employee,
          attributes: ['name', 'email', 'password'],
        }],
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong!!!");
    }
  },

  paranoid1: async (req,res)=>{
    try {
      const {name, email, password} = req.body;
      const data = await Employee.create({
        name: name,
        email: email,
        password: password
      })
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid2: async (req,res)=>{
    try {
      const data = await Employee.destroy({
        where: {
          id: 4
        }
      })
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid3: async (req,res)=>{
    try {
      const data = await Employee.findAll({})
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid4: async (req,res)=>{
    try {
      const data = await Employee.destroy({
        where: {
          id: 3,
        },
        force: true,
      })
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid5: async (req,res)=>{
    try {
      const data = await Employee.restore({
        where: {
          id: 1
        },
      });
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid6: async (req,res)=>{
    try {
      const data = await Employee.restore();
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid7: async (req,res)=>{
    try {
      const data = await Employee.findAll();
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },

  paranoid8: async (req,res)=>{
    try {
      const data = await Employee.findAll({paranoid: false});
      res.status(200).send({data});
    } catch (error) {
      console.log("Something went wrong");
      res.send("Something went wrong");
    }
  },
}