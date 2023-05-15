import { RequestHandler } from 'express';
import { Employee, validatorResult } from '../models/Employee';
import { jsonWriter } from '../services/jsonWriter';
import { validator } from '../utils/validator';

let ID = 3;

// Function to create an employee in ERP
export const createEmployee: RequestHandler = async (req, res, next) => {
	const newEmployee: Employee = req.body as Employee;
	newEmployee.empId = ID;
	ID++;

	const validateResult: validatorResult = validator(newEmployee);

	if (!validateResult.match) {
		return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
	}

	try {
		const empData = res.locals.empData;
		empData.push(newEmployee);
		const result = await jsonWriter(empData);
		if (result) {
			return res.status(200).json({ success: true, data: newEmployee });
		}
		else {
			return next(new Error('Unable to write to the Database..'));
		}
	}
	catch (err: any) {
		next(new Error(err));
	}

};
