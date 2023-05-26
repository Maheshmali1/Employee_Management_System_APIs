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
exports.createProfessionalTests = void 0;
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../utils");
const app = (0, utils_1.createServer)();
const newPerson = {
    'currentEmployeer': 'ABC  Technologies',
    'previousEmployeer': 'NA',
    'salary': 12345678,
    'highestEducation': 'B.Tech',
    'highestEducationInstitute': 'COEP',
    'highestEducationGrades': 9
};
const personMahesh = {
    'success': true,
    'data': {
        'currentEmployeer': 'ABC  Technologies',
        'previousEmployeer': 'NA',
        'salary': 12345678,
        'highestEducation': 'B.Tech',
        'highestEducationInstitute': 'COEP',
        'highestEducationGrades': 9,
        'empId': expect.any(Number)
    }
};
const createProfessionalTests = () => describe('Test Suite - professional Informaiton', () => {
    describe('Given that the creation of professional information is sucessful', () => {
        it('should return 200 with created professional data', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send(newPerson);
            expect(statusCode).toBe(200);
            expect(body).toEqual(personMahesh);
        }));
    });
    // Invalid type testing
    //invalid type of currentEmployeer
    describe('Given that creation of personal information failed due to invalid type of field - currentEmployeer (only string allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 12342,
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    //invalid type of previousEmployeer
    describe('Given that creation of personal information failed due to invalid type of field - previousEmployeer (only string allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 21432,
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    //invalid type of salary
    describe('Given that creation of personal information failed due to invalid type of field - salary (only numbers allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': '12345678',
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be integer');
        }));
    });
    //invalid type of highestEducation
    describe('Given that creation of personal information failed due to invalid type of field - highestEducation (only string allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 12,
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    //invalid type of highestEducationInstitute
    describe('Given that creation of personal information failed due to invalid type of field - highestEducationInstitute (only string allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 152,
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be string');
        }));
    });
    //invalid type of highestEducationGrades
    describe('Given that creation of personal information failed due to invalid type of field - highestEducationGrades (only string allowed)', () => {
        it('Should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': '9'
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must be integer');
        }));
    });
    // missing field validation
    // currentEmployeer is missing
    describe('Given that creation of personal information is failed due to missing field - currentEmployeer in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'currentEmployeer\'');
        }));
    });
    // previousEmployeer is missing
    describe('Given that creation of personal information is failed due to missing field - previousEmployeer in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'previousEmployeer\'');
        }));
    });
    // salary is missing
    describe('Given that creation of personal information is failed due to missing field - salary in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'salary\'');
        }));
    });
    // highestEducation is missing
    describe('Given that creation of personal information is failed due to missing field - highestEducation in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducationInstitute': 'COEP',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'highestEducation\'');
        }));
    });
    // highestEducationInstitute is missing
    describe('Given that creation of personal information is failed due to missing field - highestEducationInstitute in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationGrades': 9
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'highestEducationInstitute\'');
        }));
    });
    // highestEducationGrades is missing
    describe('Given that creation of personal information is failed due to missing field - highestEducationGrades in request body', () => {
        it('should return 422 with error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(app).post('/professional').send({
                'currentEmployeer': 'ABC  Technologies',
                'previousEmployeer': 'NA',
                'salary': 12345678,
                'highestEducation': 'B.Tech',
                'highestEducationInstitute': 'COEP'
            });
            expect(statusCode).toBe(422);
            expect(body.message.message).toBe('must have required property \'highestEducationGrades\'');
        }));
    });
});
exports.createProfessionalTests = createProfessionalTests;
