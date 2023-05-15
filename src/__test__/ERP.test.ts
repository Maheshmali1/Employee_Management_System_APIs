import supertest from 'supertest';
import { createServer } from '../utils/server';
import { validator } from '../utils/validator';

const app = createServer();

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
			it('should return 200 with created employee data', async () => {
				const { body, statusCode } = await supertest(app).post('/erp/create').send(newEmployee);
                
				expect(statusCode).toBe(200);
                
				expect(body).toEqual(employeeMahesh);
			});
		});
        
	});
    
	describe('get employee by Id route (GET)', () => {
		describe('given that employee does not exist', () => {
			it('should return return 404', async () => {
				const id = 11;
				await supertest(app).get(`/erp/${id}`).expect(404);
			});


		});

		describe('given that employee exist', () => {
			it('should return 200 and employee data', async () => {
				const id = 3;
				const { body, statusCode } = await supertest(app).get(`/erp/${id}`);

				expect(statusCode).toBe(200);

				expect(body).toEqual(employeeMahesh);
			});
		});
	});

	describe('Update employe route (PUT)', () => {
		describe('given that updation is successful', () => {
			it('should return 200 with updated data of employee', async () => {
				const id = 3;
				const { statusCode, body } = await supertest(app).put(`/erp/${id}`).send(updatedEmployee);
                
				expect(statusCode).toBe(200);
                
				expect(body).toEqual(employeeMaheshUpdated);
			});
		});

		describe('given that employee does not exist', () => {
			it('should return return 404', async () => {
				const id = 11;
				const { statusCode} = await supertest(app).put(`/erp/${id}`).send(updatedEmployee);
                
				expect(statusCode).toBe(404);
			});
		});

	});

	describe('Delete employe route (DELETE)', () => {
		describe('given that Deletion is successful', () => {
			it('should return 200 with deleted data of employee', async () => {
				const id = 3;
				const { statusCode, body } = await supertest(app).delete(`/erp/${id}`);

				expect(statusCode).toBe(200);
				expect(body).toEqual(employeeMaheshUpdated);
			});
		});

		describe('given that employee does not exist', () => {
			it('should return return 404', async () => {
				const id = 11;
				const { statusCode } = await supertest(app).delete(`/erp/${id}`);

				expect(statusCode).toBe(404);
			});
		});

	});
});

describe('Schema Validation',()=>{
	describe('given that schema validation is successful',()=>{
		it('should return match as true with no errors',()=>{
			expect(validator(newEmployee)).toEqual({
				match:true,
				errors:[]
			});
		});
	});

	describe('given that validation failed',()=>{
		it('should return match as false and errors',()=>{
			expect(validator(SchemCheckEmployee)).toEqual({
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