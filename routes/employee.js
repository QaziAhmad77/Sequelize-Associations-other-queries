const {Router} = require('express');
const router = Router();

const controller = require('../controller/employeeController');

router.post('/', controller.postEmployee);
router.get('/', controller.getAll);
router.get('/query1', controller.getQuery1);
router.get('/query2', controller.getQuery2);
router.get('/query3', controller.getQuery3);
router.get('/query4', controller.getQuery4);
router.get('/query5', controller.getQuery5);
router.get('/query6', controller.getQuery6);
router.get('/finder1', controller.finder1);
router.get('/finder2', controller.finder2);
router.get('/finder3', controller.finder3);
router.get('/finder4', controller.finder4);
router.post('/one-to-one1', controller.oneToOne1);
router.get('/one-to-one2', controller.oneToOne2);
router.get('/one-to-one3', controller.oneToOne3);
router.get('/one-to-one4', controller.oneToOne4);
router.post('/one-to-many1', controller.oneToMany1);
router.get('/one-to-many2', controller.oneToMany2);
router.get('/one-to-many3', controller.oneToMany3);
router.get('/one-to-many4', controller.oneToMany4);
router.get('/one-to-many5', controller.oneToMany5);
router.post('/many-to-many1', controller.manyToMany1);
router.get('/many-to-many2', controller.manyToMany2);
router.get('/many-to-many3', controller.manyToMany3);
router.post('/paranoid1', controller.paranoid1);
router.delete('/paranoid2', controller.paranoid2);
router.get('/paranoid3', controller.paranoid3);
router.delete('/paranoid4', controller.paranoid4);
router.delete('/paranoid5', controller.paranoid5);
router.delete('/paranoid6', controller.paranoid6);
router.get('/paranoid7', controller.paranoid7);
router.get('/paranoid8', controller.paranoid8);
router.post('/validate', controller.validateUser);
router.delete('/deleteAll', controller.deleteAll);

router.get('/:id', controller.getOne);
router.put('/:id', controller.updated); 
router.delete('/:id', controller.deleted);



module.exports = router;