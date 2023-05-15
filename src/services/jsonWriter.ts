import fs from 'fs';
import config from 'config';
import { Employee } from '../models/Employee';

const filePath = config.get('filePath');
const DBpath = __dirname + '../../../server/'+filePath;

// Function to write to json file.
export const jsonWriter = async (newEmpData: Employee[]) => {
	try {
		await fs.promises.writeFile(DBpath, JSON.stringify(newEmpData, null, 2));
		return true;

	}
	catch (err: any) {
		throw new Error(err);
	}
};


