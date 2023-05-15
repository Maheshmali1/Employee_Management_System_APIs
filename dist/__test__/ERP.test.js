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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../utils/server");
const validator_1 = require("../utils/validator");
const app = (0, server_1.createServer)();
const newEmployee = {
    'name': 'Mahesh',
    'DOB': '2001-09-15',
    'skills': [
        'node.js',
        'typescript',
        'Express.js'
    ],
    'DOJ': '2023-03-01',
    'level': 'intern',
    'supervisorId': 2,
};
const updatedEmployee = {
    'name': 'Mahesh',
    'DOB': '2001-09-15',
    'skills': [
        'node.js',
        'typescript',
        'Express.js',
        'Jest'
    ],
    'DOJ': '2023-03-01',
    'level': 'intern',
    'supervisorId': 2,
};
const SchemCheckEmployee = {
    'name': 'Mahesh',
    'DOB': '2001-09-215',
    'skills': [
        'node.js',
        'typescript',
        'Express.js'
    ],
    'DOJ': '2023-03-01',
    'level': 'intern',
    'supervisorId': 2,
};
const employeeMahesh = {
    'success': true,
    'data': {
        'name': 'Mahesh',
        'DOB': '2001-09-15',
        'skills': [
            'node.js',
            'typescript',
            'Express.js'
        ],
        'DOJ': '2023-03-01',
        'level': 'intern',
        'supervisorId': 2,
        'empId': expect.any(Number)
    }
};
const employeeMaheshUpdated = {
    'success': true,
    'data': {
        'name': 'Mahesh',
        'DOB': '2001-09-15',
        'skills': [
            'node.js',
            'typescript',
            'Express.js',
            'Jest'
        ],
        'DOJ': '2023-03-01',
        'level': 'intern',
        'supervisorId': 2,
        'empId': expect.any(Number)
    }
};
describe('ERP APIs', () => {
    describe('create employee route (POST) ', () => {
        describe('given that creation of employee is successful', () => {
            it('should return 200 with created employee data', () => __awaiter(void 0, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(app).post('/erp/create').send(newEmployee);
                expect(statusCode).toBe(200);
                expect(body).toEqual(employeeMahesh);
            }));
        });
    });
    describe('get employee by Id route (GET)', () => {
        describe('given that employee does not exist', () => {
            it('should return return 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 11;
                yield (0, supertest_1.default)(app).get(`/erp/${id}`).expect(404);
            }));
        });
        describe('given that employee exist', () => {
            it('should return 200 and employee data', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 3;
                const { body, statusCode } = yield (0, supertest_1.default)(app).get(`/erp/${id}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual(employeeMahesh);
            }));
        });
    });
    describe('Update employe route (PUT)', () => {
        describe('given that updation is successful', () => {
            it('should return 200 with updated data of employee', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 3;
                const { statusCode, body } = yield (0, supertest_1.default)(app).put(`/erp/${id}`).send(updatedEmployee);
                expect(statusCode).toBe(200);
                expect(body).toEqual(employeeMaheshUpdated);
            }));
        });
        describe('given that employee does not exist', () => {
            it('should return return 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 11;
                const { statusCode } = yield (0, supertest_1.default)(app).put(`/erp/${id}`).send(updatedEmployee);
                expect(statusCode).toBe(404);
            }));
        });
    });
    describe('Delete employe route (DELETE)', () => {
        describe('given that Deletion is successful', () => {
            it('should return 200 with deleted data of employee', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 3;
                const { statusCode, body } = yield (0, supertest_1.default)(app).delete(`/erp/${id}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual(employeeMaheshUpdated);
            }));
        });
        describe('given that employee does not exist', () => {
            it('should return return 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = 11;
                const { statusCode } = yield (0, supertest_1.default)(app).delete(`/erp/${id}`);
                expect(statusCode).toBe(404);
            }));
        });
    });
});
describe('Schema Validation', () => {
    describe('given that schema validation is successful', () => {
        it('should return match as true with no errors', () => {
            expect((0, validator_1.validator)(newEmployee)).toEqual({
                match: true,
                errors: []
            });
        });
    });
    describe('given that validation failed', () => {
        it('should return match as false and errors', () => {
            expect((0, validator_1.validator)(SchemCheckEmployee)).toEqual({
                match: false,
                errors: [
                    {
                        instancePath: '/DOB',
                        schemaPath: '#/properties/DOB/format',
                        message: 'must match format "date"',
                        keyword: 'format',
                        params: expect.any(Object)
                    }
                ]
            });
        });
    });
});
