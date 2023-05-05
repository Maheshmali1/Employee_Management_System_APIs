import { RequestHandler } from 'express';
import { Employee, validatorResult } from '../models/ERP';
import { jsonReader } from '../services/jsonReader';
import { jsonWriter } from '../services/jsonWriter';
import { validator } from '../utils/validator';

let ID = 1;

// Function to get all employee in ERP
export const getAllEmployees: RequestHandler = async (req, res, next) => {
	try {
		const Data: Employee[] = await jsonReader();
		res.status(200).json({ success: true, data: Data });
	}
	catch (err: any) {
		next(new Error(err));
	}
};

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
		const result = await jsonWriter(newEmployee, 1);
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

// Function to update an employee by Id from ERP
export const updateEmployee: RequestHandler = async (req, res, next) => {
	const empId: string = (req.params as { id: string }).id;

	try {
		const empData: Employee[] = await jsonReader();
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
		const result = await jsonWriter(empData, 0);

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
		const result = await jsonWriter(empData, 0);

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

