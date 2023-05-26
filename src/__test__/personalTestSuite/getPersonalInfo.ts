import supertest from 'supertest';
import { createServer } from '../../utils';

const app = createServer();


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

export const getPersonalInfoTest = () => describe('TEST SUITE 2 => get employee personal Info by Id route (GET)', () => {
	describe('given that employee does not exist', () => {
		it('should return return 404', async () => {
			const id = 11;
			const { statusCode } = await supertest(app).get(`/personal/${id}`);
			expect(statusCode).toBe(404);

		});


	});

	describe('given that employee personal info exist', () => {
		it('should return 200 and personal info data', async () => {
			const id = 1;
			const { statusCode, body } = await supertest(app).get(`/personal/${id}`);

			expect(statusCode).toBe(200);
			expect(body).toEqual(personMahesh);


		});
	});

	describe('given that employee personal info read fails due to invalid type of params Id', () => {
		it('should return 406 status with error message', async () => {
			const id = 'abc';
			const { statusCode, body } = await supertest(app).get(`/personal/${id}`);

			expect(statusCode).toBe(406);
			expect(body.message).toBe('Invalid type of employee id. It should be integer');


		});
	});
});
