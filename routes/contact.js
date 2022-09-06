const {Router} = require('express');
const router = Router();

const controller = require('../controller/contactController');

router.post('/', controller.postContact);


module.exports = router;