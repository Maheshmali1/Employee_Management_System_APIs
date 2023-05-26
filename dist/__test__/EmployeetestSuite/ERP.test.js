"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('ERP test suite', () => {
    (0, index_1.createEmployeeTests)();
    (0, index_1.getEmployeeTests)();
    (0, index_1.updateEmployeeTests)();
    (0, index_1.deleteEmployeeTests)();
});
