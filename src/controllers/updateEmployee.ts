import { RequestHandler } from 'express';
import { Employee, validatorResult } from '../models/Employee';
import { jsonWriter } from '../services/jsonWriter';
import { validator } from '../utils/validator';

// Function to update an employee by Id from ERP
export const updateEmployee: RequestHandler = async (req, res, next) => {
	const empId: string = (req.params as { id: string }).id;

	try {
		const empData :Employee[] = res.locals.empData;
		const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}

		let validateResult: validatorResult = validator(empData[empInd]);

		if (!validateResult.match) {
			return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
		}

		const updateData: Employee = req.body as Employee;

		validateResult = validator(updateData);

		if (!validateResult.match) {
			return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
		}

		updateData.empId = empData[empInd].empId;
		empData[empInd] = updateData;
		const result = await jsonWriter(empData);

		if (result) {
			return res.status(200).json({ success: true, data: updateData });
		}
		else {
			return next(new Error('Unable to write to the Database..'));
		}

	}
	catch (err: any) {
		next(new Error(err));
	}
};
