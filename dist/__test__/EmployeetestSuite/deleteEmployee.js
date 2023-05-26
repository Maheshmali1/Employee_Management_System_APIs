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
exports.deleteEmployeeTests = void 0;
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../utils");
const app = (0, utils_1.createServer)();
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
const deleteEmployeeTests = () => describe('TEST SUITE 4 => Delete employee route (DELETE)', () => {
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
    describe('given that employee delete fails due to invalid type of params Id', () => {
        it('should return 406 status with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'abc';
            const { body, statusCode } = yield (0, supertest_1.default)(app).delete(`/erp/${id}`);
            expect(statusCode).toBe(406);
            expect(body.message).toBe('Invalid type of employee id. It should be integer');
        }));
    });
});
exports.deleteEmployeeTests = deleteEmployeeTests;
