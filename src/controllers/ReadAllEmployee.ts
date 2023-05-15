import { RequestHandler } from 'express';
import { Employee} from '../models/Employee';
import { jsonReader } from '../services/jsonReader';



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