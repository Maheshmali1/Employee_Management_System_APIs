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
exports.createEmployee = void 0;
const jsonWriter_1 = require("../services/jsonWriter");
const validator_1 = require("../utils/validator");
let ID = 3;
// Function to create an employee in ERP
const createEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmployee = req.body;
    newEmployee.empId = ID;
    ID++;
    const validateResult = (0, validator_1.validator)(newEmployee);
    if (!validateResult.match) {
        return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
    }
    try {
        const empData = res.locals.empData;
        empData.push(newEmployee);
        const result = yield (0, jsonWriter_1.jsonWriter)(empData);
        if (result) {
            return res.status(200).json({ success: true, data: newEmployee });
        }
        else {
            return next(new Error('Unable to write to the Database..'));
        }
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.createEmployee = createEmployee;
