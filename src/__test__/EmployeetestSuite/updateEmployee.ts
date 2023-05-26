import supertest from 'supertest';
import { createServer } from '../../utils';

const app = createServer();

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

const id=3;

export const updateEmployeeTests = ()=>describe('TEST SUITE 3 => create employee route (put) ', () => {
    
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
	// Invalid Type testing.
	// Invalid type of employee name
	describe('given that updation failed due to invalid type of Employee Name(only strnig allowed)',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 123,
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});

	// Invalid DOB type (only string inputs allowed)
	describe('given that updation failed due to invalid type of Employee DOB type',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': 20010915,
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-65',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});

	// Invalid DOB format.
	describe('given that updation failed due to invalid type of Employee DOB format',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-19-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must match format \"date\"');
		});
	});

	// Invalid skills (only strings allowed)
	describe('given that updation failed due to invalid type of skills (only strings allowed)',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					1,
					2,
					3
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});

	// Invalid DOJ type (only string inputs allowed)
	describe('given that updation failed due to invalid type of Employee DOJ type',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': 20010915,
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-65',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must be string');
		});
	});

	// Invalid DOJ format
	describe('given that updation failed due to invalid type of Employee DOJ format',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-65',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
			expect(body.message.message).toBe('must match format \"date\"');
		});
	});

	// Invalid employee Type
	describe('given that updation failed due to invalid type of Employee Level(only Intern/developer/tester/manager allowed)',()=>{
		it('should return 406 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'Guard',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(406);
			expect(body.message).toBe('Provided employee level should be from intern/test/developer/manager');
		});
	});
    
	// Invalid supervisor Id - for interns only developer or tester supervisors are allowed.
	describe('given that updation failed due to invalid type of Employee supervisor Id',()=>{
		it('should return 406 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 1,
			});

			expect(statusCode).toBe(406);
            
			expect(body.message).toBe('intern can have only developer or tester as supervisor. Provide valid supervisorId.');
		});
	});

	// Invalid supervisor Id - for developer only managers supervisors are allowed.
	describe('given that updation failed due to invalid type of Employee supervisor Id',()=>{
		it('should return 406 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'developer',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(406);
            
			expect(body.message).toBe('developer/tester can have only manager as supervisor. Provide valid supervisorId.');
		});
	});

	// Invalid supervisor Id - for testers only managers supervisors are allowed.
	describe('given that updation failed due to invalid type of Employee supervisor Id',()=>{
		it('should return 406 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'tester',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(406);
            
			expect(body.message).toBe('developer/tester can have only manager as supervisor. Provide valid supervisorId.');
		});
	});

	// Invalid supervisor Id - for managers only managers supervisors are allowed.
	describe('given that updation failed due to invalid type of Employee supervisor Id',()=>{
		it('should return 406 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'manager',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(406);
            
			expect(body.message).toBe('manager can have only manager as supervisor. Provide valid supervisorId.');
		});
	});
    
	// Missing field testing.
	// Missing the name of employee
	describe('given that updation failed due to missing field - name of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'name\'');
		});
	});
    
 
	// Missing the DOB of employee
	describe('given that updation failed due to missing field - DOB of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'DOB\'');
		});
	});
    
 
	// Missing the skills of employee
	describe('given that updation failed due to missing field - skills of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'DOJ': '2023-03-01',
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'skills\'');
		});
	});
    
 
	// Missing the DOJ of employee
	describe('given that updation failed due to missing field - DOJ of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'level': 'intern',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'DOJ\'');
		});
	});
    
 
	// Missing the level of employee
	describe('given that updation failed due to missing field - level of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'supervisorId': 2,
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'level\'');
		});
	});
    
 
	// Missing the supervisorId of employee
	describe('given that updation failed due to missing field - supervisorId of employee',()=>{
		it('should return 422 with error message',async()=>{
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern'
			});

			expect(statusCode).toBe(422);
            
			expect(body.message.message).toBe('must have required property \'supervisorId\'');
		});
	});
    
	// params check test.
	describe('given that employee update fails due to invalid type of params Id',()=>{
		it('should return 406 status with error message',async()=>{
			const id = 'abc';
			const {body,statusCode} = await supertest(app).put(`/erp/${id}`).send({
				'name': 'Mahesh',
				'DOB': '2001-09-15',
				'skills': [
					'node.js',
					'typescript',
					'Express.js'
				],
				'DOJ': '2023-03-01',
				'level': 'intern'
			});


			expect(statusCode).toBe(406);
			expect(body.message).toBe('Invalid type of employee id. It should be integer');
		});
	});
    
});