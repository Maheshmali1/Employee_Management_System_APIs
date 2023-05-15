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
exports.updateEmployee = void 0;
const jsonWriter_1 = require("../services/jsonWriter");
const validator_1 = require("../utils/validator");
// Function to update an employee by Id from ERP
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = req.params.id;
    try {
        const empData = res.locals.empData;
        const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));
        if (empInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
        }
        let validateResult = (0, validator_1.validator)(empData[empInd]);
        if (!validateResult.match) {
            return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
        }
        const updateData = req.body;
        validateResult = (0, validator_1.validator)(updateData);
        if (!validateResult.match) {
            return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
        }
        updateData.empId = empData[empInd].empId;
        empData[empInd] = updateData;
        const result = yield (0, jsonWriter_1.jsonWriter)(empData);
        if (result) {
            return res.status(200).json({ success: true, data: updateData });
        }
        else {
            return next(new Error('Unable to write to the Database..'));
        }
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.updateEmployee = updateEmployee;
