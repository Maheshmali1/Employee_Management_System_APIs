"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const EmployeeSchema_1 = require("../models/EmployeeSchema");
const validate = ajv.compile(EmployeeSchema_1.employeeSchema);
// Function to validate the employee against schema.
const validator = (employee) => {
    const match = validate(employee);
    const errors = (!match) ? validate.errors : [];
    return {
        match,
        errors
    };
};
exports.validator = validator;
