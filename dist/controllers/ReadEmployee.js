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
exports.getEmployee = void 0;
const jsonReader_1 = require("../services/jsonReader");
const validator_1 = require("../utils/validator");
// Function to get an particular employee by Id from ERP
const getEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empId = req.params.id;
        const empData = yield (0, jsonReader_1.jsonReader)();
        const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));
        if (empInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
        }
        const validateResult = (0, validator_1.validator)(empData[empInd]);
        if (!validateResult.match) {
            return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
        }
        res.status(200).json({ success: true, data: empData[empInd] });
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.getEmployee = getEmployee;
