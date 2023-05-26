import supertest from 'supertest';
import { createServer } from '../../utils';

const app = createServer();

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

export const createProfessionalTests = () => describe('Test Suite - professional Informaiton', () => {
	describe('Given that the creation of professional information is sucessful', () => {
		it('should return 200 with created professional data', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send(newPerson);

			expect(statusCode).toBe(200);
			expect(body).toEqual(personMahesh);
		});
	});

	// Invalid type testing
	//invalid type of currentEmployeer
	describe('Given that creation of personal information failed due to invalid type of field - currentEmployeer (only string allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 12342,
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation': 'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});

	//invalid type of previousEmployeer
	describe('Given that creation of personal information failed due to invalid type of field - previousEmployeer (only string allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 21432,
				'salary': 12345678,
				'highestEducation': 'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});
	//invalid type of salary
	describe('Given that creation of personal information failed due to invalid type of field - salary (only numbers allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': '12345678',
				'highestEducation': 'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be integer');
		});
	});

	//invalid type of highestEducation
	describe('Given that creation of personal information failed due to invalid type of field - highestEducation (only string allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation': 12,
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});
	//invalid type of highestEducationInstitute
	describe('Given that creation of personal information failed due to invalid type of field - highestEducationInstitute (only string allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation': 'B.Tech',
				'highestEducationInstitute': 152,
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});
	//invalid type of highestEducationGrades
	describe('Given that creation of personal information failed due to invalid type of field - highestEducationGrades (only string allowed)', () => {
		it('Should return 422 with error message', async () => {
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation':'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': '9'
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be integer');
		});
	});

	// missing field validation
    
	// currentEmployeer is missing
	describe('Given that creation of personal information is failed due to missing field - currentEmployeer in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation':'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'currentEmployeer\'');
		});
	});

	// previousEmployeer is missing
	describe('Given that creation of personal information is failed due to missing field - previousEmployeer in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'salary': 12345678,
				'highestEducation':'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'previousEmployeer\'');
		});
	});

	// salary is missing
	describe('Given that creation of personal information is failed due to missing field - salary in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'highestEducation':'B.Tech',
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'salary\'');
		});
	});

	// highestEducation is missing
	describe('Given that creation of personal information is failed due to missing field - highestEducation in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducationInstitute': 'COEP',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'highestEducation\'');
		});
	});
	// highestEducationInstitute is missing
	describe('Given that creation of personal information is failed due to missing field - highestEducationInstitute in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation':'B.Tech',
				'highestEducationGrades': 9
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'highestEducationInstitute\'');
		});
	});
	// highestEducationGrades is missing
	describe('Given that creation of personal information is failed due to missing field - highestEducationGrades in request body',()=>{
		it('should return 422 with error message',async()=>{
			const { statusCode, body } = await supertest(app).post('/professional').send({
				'currentEmployeer': 'ABC  Technologies',
				'previousEmployeer': 'NA',
				'salary': 12345678,
				'highestEducation':'B.Tech',
				'highestEducationInstitute': 'COEP'
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must have required property \'highestEducationGrades\'');
		});
	});
});