import supertest from 'supertest';
import { createServer } from '../../utils';


const app = createServer();


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

export const getEmployeeTests = ()=>describe('TEST SUITE 2 => get employee by Id route (GET)', () => {
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

	describe('given that employee read fails due to invalid type of params Id',()=>{
		it('should return 406 status with error message',async()=>{
			const id = 'abc';
			const {body,statusCode} = await supertest(app).get(`/erp/${id}`);

			expect(statusCode).toBe(406);
			expect(body.message).toBe('Invalid type of employee id. It should be integer');
		});
	});
});
