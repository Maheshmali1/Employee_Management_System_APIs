"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supervisorValidator = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
// supervisor validation function.
const supervisorValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const newEmployee = req.body;
    const validateResult = (0, utils_1.validator)(newEmployee, models_1.employeeSchema);
    if (!validateResult.match) {
        return res.status(422).json({ success: false, message: { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message } });
    }
    const newEmpsupervisorId = newEmployee.supervisorId;
    const newEmplevel = newEmployee.level.toLowerCase();
    const data = yield (0, services_1.jsonReader)();
    const empData = data.erp;
    res.locals.data = data;
    const empInd = empData.findIndex(emp => emp.empId == newEmpsupervisorId);
    if (empInd < 0) {
        return res.status(404).json({ success: false, message: 'Could not find supervisor with given Id' });
    }
    const supervisorLevel = empData[empInd].level;
    if (newEmplevel == models_1.Level.Intern) {
        if (supervisorLevel === models_1.Level.Developer || supervisorLevel === models_1.Level.Tester) {
            next();
        }
        else {
            return res.status(406).send({ success: false, message: 'intern can have only developer or tester as supervisor. Provide valid supervisorId.' });
        }
    }
    else if (newEmplevel === models_1.Level.Developer || newEmplevel === models_1.Level.Tester) {
        if (supervisorLevel === models_1.Level.Manager) {
            next();
        }
        else {
            return res.status(406).send({ success: false, message: 'developer/tester can have only manager as supervisor. Provide valid supervisorId.' });
        }
    }
    else if (newEmplevel === models_1.Level.Manager) {
        if (supervisorLevel === models_1.Level.Manager) {
            next();
        }
        else {
            return res.status(406).send({ success: false, message: 'manager can have only manager as supervisor. Provide valid supervisorId.' });
        }
    }
    else {
        return res.status(406).send({ success: false, message: 'Provided employee level should be from intern/test/developer/manager' });
    }
});
exports.supervisorValidator = supervisorValidator;
