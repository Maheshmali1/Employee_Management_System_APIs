import { RequestHandler } from 'express';
import { Employee, validatorResult } from '../models/Employee';
import { jsonReader } from '../services/jsonReader';
import { validator } from '../utils/validator';

// Function to get an particular employee by Id from ERP
export const getEmployee: RequestHandler = async (req, res, next) => {
	try {
		const empId: string = (req.params as { id: string }).id;
		const empData: Employee[] = await jsonReader();
		
		const empInd = empData.findIndex(emp => emp.empId == parseInt(empId));

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}

		const validateResult: validatorResult = validator(empData[empInd]);

		if(!validateResult.match){
			return res.status(500).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
		}
		
		res.status(200).json({ success: true, data: empData[empInd] });
	}
	catch (err: any) {
		next(new Error(err));
	}
};
