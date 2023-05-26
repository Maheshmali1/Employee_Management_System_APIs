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
exports.deleteEmployee = exports.updateEmployee = exports.getAllEmployees = exports.getEmployee = exports.createEmployee = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
let ID = 3;
// Function to create an employee in ERP
const createEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmployee = req.body;
    newEmployee.empId = ID;
    ID++;
    try {
        const data = res.locals.data;
        data.erp.push(newEmployee);
        const result = yield (0, services_1.jsonWriter)(data);
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
// Function to get an particular employee by Id from ERP
const getEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const empId = req.params.id;
        const data = yield (0, services_1.jsonReader)();
        const empData = data.erp;
        const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));
        if (empInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
        }
        const validateResult = (0, utils_1.validator)(empData[empInd], models_1.employeeSchema);
        if (!validateResult.match) {
            return res.status(422).json({ success: false, message: { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message } });
        }
        res.status(200).json({ success: true, data: empData[empInd] });
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.getEmployee = getEmployee;
// Function to get all employee in ERP
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, services_1.jsonReader)();
        const empData = data.erp;
        res.status(200).json({ success: true, data: empData });
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.getAllEmployees = getAllEmployees;
// Function to update an employee by Id from ERP
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const empId = req.params.id;
    try {
        const data = res.locals.data;
        const empData = data.erp;
        const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));
        if (empInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
        }
        const validateResult = (0, utils_1.validator)(empData[empInd], models_1.employeeSchema);
        if (!validateResult.match) {
            return res.status(422).json({ success: false, message: { schemaPath: (_c = validateResult.errors) === null || _c === void 0 ? void 0 : _c[0].schemaPath, message: (_d = validateResult.errors) === null || _d === void 0 ? void 0 : _d[0].message } });
        }
        const updateData = req.body;
        updateData.empId = empData[empInd].empId;
        empData[empInd] = updateData;
        const result = yield (0, services_1.jsonWriter)(data);
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
// Function to delete an employee by Id from ERP
const deleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const empId = req.params.id;
    try {
        const data = yield (0, services_1.jsonReader)();
        const empData = data.erp;
        const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));
        if (empInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
        }
        const validateResult = (0, utils_1.validator)(empData[empInd], models_1.employeeSchema);
        if (!validateResult.match) {
            return res.status(422).json({ success: false, message: { schemaPath: (_e = validateResult.errors) === null || _e === void 0 ? void 0 : _e[0].schemaPath, message: (_f = validateResult.errors) === null || _f === void 0 ? void 0 : _f[0].message } });
        }
        const deletedEmployee = empData[empInd];
        empData.splice(empInd, 1);
        const result = yield (0, services_1.jsonWriter)(data);
        if (result) {
            return res.status(200).json({ success: true, data: deletedEmployee });
        }
        else {
            return next(new Error('Uable to write to the Database..'));
        }
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.deleteEmployee = deleteEmployee;
