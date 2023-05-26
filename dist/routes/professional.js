"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get('/:id', middleware_1.paramsValidator, controllers_1.getProfessionalInfo);
router.post('/', controllers_1.createProfessionalInfo);
exports.professionalRouter = router;
