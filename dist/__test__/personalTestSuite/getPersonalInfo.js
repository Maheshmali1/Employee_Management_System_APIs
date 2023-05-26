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
exports.getPersonalInfoTest = void 0;
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../utils");
const app = (0, utils_1.createServer)();
const personMahesh = {
    'success': true,
    'data': {
        'address': 'shivajinagar, pune',
        'phoneNo': '9765040510',
        'emailId': 'mahesh@gmail.com',
        'age': 22,
        'empId': expect.any(Number),
        'bloodGroup': 'A+',
        'hobbies': [
            'readig',
            'coding'
        ],
        'married': 'no',
        'workingProfessional': 'yes',
    }
};
const getPersonalInfoTest = () => describe('TEST SUITE 2 => get employee personal Info by Id route (GET)', () => {
    describe('given that employee does not exist', () => {
        it('should return return 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 11;
            const { statusCode } = yield (0, supertest_1.default)(app).get(`/personal/${id}`);
            expect(statusCode).toBe(404);
        }));
    });
    describe('given that employee personal info exist', () => {
        it('should return 200 and personal info data', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const { statusCode, body } = yield (0, supertest_1.default)(app).get(`/personal/${id}`);
            expect(statusCode).toBe(200);
            expect(body).toEqual(personMahesh);
        }));
    });
    describe('given that employee personal info read fails due to invalid type of params Id', () => {
        it('should return 406 status with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'abc';
            const { statusCode, body } = yield (0, supertest_1.default)(app).get(`/personal/${id}`);
            expect(statusCode).toBe(406);
            expect(body.message).toBe('Invalid type of employee id. It should be integer');
        }));
    });
});
exports.getPersonalInfoTest = getPersonalInfoTest;
