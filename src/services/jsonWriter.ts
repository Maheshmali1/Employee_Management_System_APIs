import fs from 'fs';
import config from 'config';
import { jsonReader } from './jsonReader';
import { Employee } from '../models/ERP';

import path from 'path';

const filePath:string = config.get('filePath');
const DBpath = path.join(__dirname,'../../server/',filePath);

// Function to write to json file.
export const jsonWriter = async (newEmpData: (Employee | Employee[]), flag: number) => {
	try {
		let Data: Employee[] = await jsonReader();
		if (flag) {
			Data.push(newEmpData as Employee);
		}
		else {
			Data = newEmpData as Employee[];
		}

		await fs.promises.writeFile(DBpath, JSON.stringify(Data, null, 2));
		return true;

	}
	catch (err: any) {
		throw new Error(err);
	}
};


