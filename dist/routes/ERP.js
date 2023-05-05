"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ERP_1 = require("../controllers/ERP");
const supervisorValidator_1 = require("../middleware/supervisorValidator");
const router = (0, express_1.Router)();
// ERP route following '/erp/'
router.get('/', ERP_1.getAllEmployees);
router.get('/:id', ERP_1.getEmployee);
router.post('/create', supervisorValidator_1.supervisorValidator, ERP_1.createEmployee);
router.put('/:id', supervisorValidator_1.supervisorValidator, ERP_1.updateEmployee);
router.delete('/:id', ERP_1.deleteEmployee);
exports.default = router;
