import { RequestHandler } from 'express';
import { Employee, validatorResult,employeeSchema,DBdata } from '../models';
import { jsonWriter,jsonReader } from '../services';
import { validator } from '../utils';



let ID = 3;

// Function to create an employee in ERP
export const createEmployee: RequestHandler = async (req, res, next) => {
	const newEmployee: Employee = req.body as Employee;
	newEmployee.empId = ID;
	ID++;

	try {
		const data:DBdata = res.locals.data;
		data.erp.push(newEmployee);
		const result:boolean = await jsonWriter(data);
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
		const data:DBdata = await jsonReader();
		const empData:Employee[] = data.erp;
		const empInd:number = empData.findIndex(emp=> emp.empId == parseInt(empId)); 

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}

		const validateResult: validatorResult = validator(empData[empInd],employeeSchema);

		if(!validateResult.match){
			return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
		}
		
		res.status(200).json({ success: true, data: empData[empInd] });
	}
	catch (err: any) {
		next(new Error(err));
	}
};

// Function to get all employee in ERP
export const getAllEmployees: RequestHandler = async (req, res, next) => {
	try {
		const data:DBdata = await jsonReader();
		const empData:Employee[] = data.erp;
		res.status(200).json({ success: true, data: empData });
	}
	catch (err: any) {
		next(new Error(err));
	}
};

// Function to update an employee by Id from ERP
export const updateEmployee: RequestHandler = async (req, res, next) => {
	const empId: string = (req.params as { id: string }).id;

	try {
		const data:DBdata = res.locals.data;
		const empData :Employee[] = data.erp;
		const empInd:number = empData.findIndex(emp => emp.empId == parseInt(empId));

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}

		const validateResult: validatorResult = validator(empData[empInd],employeeSchema);

		if (!validateResult.match) {
			return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
		}

		const updateData: Employee = req.body as Employee;
		
		updateData.empId = empData[empInd].empId;
		empData[empInd] = updateData;
		const result:boolean = await jsonWriter(data);

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
		const data:DBdata = await jsonReader();
		const empData: Employee[] = data.erp;
		const empInd:number = empData.findIndex(emp => emp.empId == parseInt(empId));

		if (empInd < 0) {
			return res.status(404).json({ success: false, message: 'Could not find Employee with given Id' });
		}


		const validateResult: validatorResult = validator(empData[empInd],employeeSchema);

		if (!validateResult.match) {
			return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
		}
		
		const deletedEmployee:Employee = empData[empInd];
		empData.splice(empInd, 1);
		const result:boolean = await jsonWriter(data);

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