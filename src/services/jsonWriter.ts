import fs from 'fs';
import config from 'config';

import { DBdata } from '../models';
import path from 'path';
const filePath:string = config.get('filePath');
const DBpath:string = path.join(__dirname,'../../server/',filePath);

// Function to write to json file.
export const jsonWriter = async (newEmpData:DBdata):Promise<boolean> => {
	try {
		await fs.promises.writeFile(DBpath, JSON.stringify(newEmpData, null, 2));
		return true;

	}
	catch (err:any) {
		throw new Error(err);
	}
};

// Error handler reference.