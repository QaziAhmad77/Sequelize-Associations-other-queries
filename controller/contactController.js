let db = require('../models/index.js');
let Contact = db.contact;
module.exports = {
    postContact: async(req,res)=>{
        try {
            const {permanent_address, name} = req.body;
            if (!permanent_address || !name) {
                return res.status(400).send("Required fields can't be empty");
              }
            const data = await Contact.create({
                permanent_address: permanent_address,
                name: name
            })
            res.status(200).send({data});
        } catch (e) {
          let message;
          e.errors.forEach(error => {
            switch(error.validatorKey){
              case 'isAlpha':
                message = error.message;     // here error will come from the model while in (len and islowercase) error is come from the controller
                break;
                case 'isLowercase':
                  message = "Only lower case is allowed";
                  break;
                  case 'len':
                    message = "min 2 max 10 characters allowed";
                    break;
            }
          });
          res.status(200).send({message});
        }
    },
  }