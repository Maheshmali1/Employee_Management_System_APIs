import { RequestHandler } from 'express';
import { Employee, validatorResult } from '../models/Employee';
import { jsonReader } from '../services/jsonReader';
import { jsonWriter } from '../services/jsonWriter';
import { validator } from '../utils/validator';

// Function to delete an employee by Id from ERP
export const deleteEmployee: RequestHandler = async (req, res, next) => {
	const empId: string = (req.params as { id: string }).id;

	try {
		const empData: Employee[] = await jsonReader();
		const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}


		const validateResult: validatorResult = validator(empData[empInd]);

		if (!validateResult.match) {
			return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
		}
		
		const deletedEmployee = empData[empInd];
		empData.splice(empInd, 1);
		const result = await jsonWriter(empData);

		if (result) {
			return res.status(200).json({ success: true, data: deletedEmployee });
		}
		else {
			return next(new Error('Uable to write to the Database..'));
		}

	}
	catch (err: any) {
		next(new Error(err));
	}
};