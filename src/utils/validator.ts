import { Employee,validatorResult } from '../models/Employee';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);

import { employeeSchema } from '../models/EmployeeSchema';
const validate = ajv.compile(employeeSchema);

// Function to validate the employee against schema.
export const validator = (employee:Employee):validatorResult=>{
	const match = validate(employee);
	const errors = (!match)? validate.errors : [];
	return {
		match,
		errors
	};
};
