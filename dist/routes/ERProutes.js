"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erpRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// ERP route following '/erp/'
router.get('/', controllers_1.getAllEmployees);
router.get('/:id', middleware_1.paramsValidator, controllers_1.getEmployee);
router.post('/create', middleware_1.supervisorValidator, controllers_1.createEmployee);
router.put('/:id', middleware_1.paramsValidator, middleware_1.supervisorValidator, controllers_1.updateEmployee);
router.delete('/:id', middleware_1.paramsValidator, controllers_1.deleteEmployee);
exports.erpRouter = router;
