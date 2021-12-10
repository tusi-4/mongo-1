const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.addNew);
router.put('/employees/:id', EmployeeController.changeById);
router.delete('/employees/:id', EmployeeController.removeById);

module.exports = router;
