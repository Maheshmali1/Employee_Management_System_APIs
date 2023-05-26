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
exports.createPersonTests = void 0;
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../utils");
const app = (0, utils_1.createServer)();
const newPerson = {
    'address': 'shivajinagar, pune',
    'phoneNo': '9765040510',
    'emailId': 'mahesh@gmail.com',
    'age': 22,
    'bloodGroup': 'A+',
    'hobbies': [
        'readig',
        'coding'
    ],
    'married': 'no',
    'workingProfessional': 'yes',
};
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
const createPersonTests = () => describe('TEST SUITE 1 => create personal info route (POST) ', () => {
    describe('given that creation of person information is successful', () => {
        it('should return 200 with created personal data', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send(newPerson);
            expect(statusCode).toBe(200);
            expect(body).toEqual(personMahesh);
        }));
    });
    // Invalid Type testing.
    // Invalid type of employee address
    describe('given that creation failed due to invalid type of Employee address (only strnig allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 234123,
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee phoneNo
    describe('given that creation failed due to invalid type of Employee phoneNo (only strnig allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': 9765040510,
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee phoneNo format
    describe('given that creation failed due to invalid type of Employee phoneNo (only 10 digit vaild phoneNo allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '976wsdf5040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must match pattern \"^[0-9]{10}$\"');
        }));
    });
    // Invalid type of employee emailId 
    describe('given that creation failed due to invalid type of Employee emailId (only strnig allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 2334,
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee emailId format
    describe('given that creation failed due to invalid type of Employee emailId (only correct email format allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'maheshmali.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must match format \"email\"');
        }));
    });
    // Invalid type of employee age
    describe('given that creation failed due to invalid type of Employee age (only number allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': '22',
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be integer');
        }));
    });
    // Invalid type of employee bloodGroup
    describe('given that creation failed due to invalid type of Employee BloodGroup(only string allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 12,
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee hobbies
    describe('given that creation failed due to invalid type of Employee hobbies(only strings allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    123,
                    'reading'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee married
    describe('given that creation failed due to invalid type of Employee Married(only string allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'coding',
                    'reading'
                ],
                'married': 1,
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Invalid type of employee workingProfessional
    describe('given that creation failed due to invalid type of Employee workding professional(only string allowed)', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'coding',
                    'reading'
                ],
                'married': 'no',
                'workingProfessional': 1,
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    // Missing field test cases.
    // Missing the address of employee
    describe('given that creation failed due to missing field - address of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'address\'');
        }));
    });
    // Missing the phoneNo of employee
    describe('given that creation failed due to missing field - phoneNo of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'phoneNo\'');
        }));
    });
    // Missing the emailId of employee
    describe('given that creation failed due to missing field - emailId of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'emailId\'');
        }));
    });
    // Missing the age of employee
    describe('given that creation failed due to missing field - age of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'age\'');
        }));
    });
    // Missing the bloodGroup of employee
    describe('given that creation failed due to missing field - bloodGroup of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'bloodGroup\'');
        }));
    });
    // Missing the hobbies of employee
    describe('given that creation failed due to missing field - hobbies of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'married': 'no',
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'hobbies\'');
        }));
    });
    // Missing the married of employee
    describe('given that creation failed due to missing field - married of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'workingProfessional': 'yes',
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'married\'');
        }));
    });
    // Missing the workingprofessional of employee
    describe('given that creation failed due to missing field - workingProfessional of employee personal information', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/personal').send({
                'address': 'shivajinagar, pune',
                'phoneNo': '9765040510',
                'emailId': 'mahesh@gmail.com',
                'age': 22,
                'bloodGroup': 'A+',
                'hobbies': [
                    'readig',
                    'coding'
                ],
                'married': 'no'
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'workingProfessional\'');
        }));
    });
});
exports.createPersonTests = createPersonTests;
