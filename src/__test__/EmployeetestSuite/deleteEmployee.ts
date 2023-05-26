import supertest from 'supertest';
import { createServer } from '../../utils';

const app = createServer();

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

export const deleteEmployeeTests = ()=> describe('TEST SUITE 4 => Delete employee route (DELETE)', () => {
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

	describe('given that employee delete fails due to invalid type of params Id',()=>{
		it('should return 406 status with error message',async()=>{
			const id = 'abc';
			const { body,statusCode } = await supertest(app).delete(`/erp/${id}`);

			expect(statusCode).toBe(406);
			expect(body.message).toBe('Invalid type of employee id. It should be integer');
		});
	});

});