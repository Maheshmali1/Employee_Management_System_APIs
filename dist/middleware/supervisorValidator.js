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
const jsonReader_1 = require("../services/jsonReader");
const levels_1 = require("../models/levels");
// supervisor validation function.
const supervisorValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmployee = req.body;
    const newEmpsupervisorId = newEmployee.supervisorId;
    const newEmplevel = newEmployee.level.toLowerCase();
    const data = yield (0, jsonReader_1.jsonReader)();
    res.locals.empData = data;
    const empInd = data.findIndex(emp => emp.empId == newEmpsupervisorId);
    if (empInd < 0) {
        return res.status(404).json({ success: false, message: 'Could not find supervisor with given Id' });
    }
    const supervisorLevel = data[empInd].level;
    if (newEmplevel == levels_1.Level.Intern) {
        if (supervisorLevel === levels_1.Level.Developer || supervisorLevel === levels_1.Level.Tester) {
            next();
        }
        else {
            return res.status(401).send({ success: false, message: 'intern can have only developer or tester as supervisor. Provide valid supervisorId..' });
        }
    }
    else if (newEmplevel === levels_1.Level.Developer || newEmplevel === levels_1.Level.Tester) {
        if (supervisorLevel === levels_1.Level.Manager) {
            next();
        }
        else {
            return res.status(401).send({ success: false, message: 'developer/tester can have only manager as supervisor. Provide valid supervisorId..' });
        }
    }
    else if (newEmplevel === levels_1.Level.Manager) {
        if (supervisorLevel === levels_1.Level.Manager) {
            next();
        }
        else {
            return res.status(401).send({ success: false, message: 'manager can have only manager as supervisor. Provide valid supervisorId..' });
        }
    }
    else {
        return res.status(401).send({ success: false, message: ' Provided employee level should be from intern/test/developer/manager' });
    }
});
exports.supervisorValidator = supervisorValidator;
