import supertest from 'supertest';
import { createServer } from '../../utils';

const app = createServer();


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

export const getProfessionalInfoTest = () => describe('TEST SUITE => get employee professional Info by Id route (GET)', () => {
	describe('given that employee does not exist', () => {
		it('should return return 404', async () => {
			const id = 11;
			const { statusCode } = await supertest(app).get(`/professional/${id}`);
			expect(statusCode).toBe(404);

		});


	});

	describe('given that employee professional info exist', () => {
		it('should return 200 and professional info data', async () => {
			const id = 1;
			const { statusCode, body } = await supertest(app).get(`/professional/${id}`);

			expect(statusCode).toBe(200);
			expect(body).toEqual(personMahesh);


		});
	});

	describe('given that employee professional info read fails due to invalid type of params Id', () => {
		it('should return 406 status with error message', async () => {
			const id = 'abc';
			const { statusCode, body } = await supertest(app).get(`/professional/${id}`);

			expect(statusCode).toBe(406);
			expect(body.message).toBe('Invalid type of employee id. It should be integer');
		});
	});
});
