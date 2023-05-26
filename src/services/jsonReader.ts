import fs from 'fs';
import config from 'config';

import path from 'path';
import { DBdata } from '../models';

const filePath:string = config.get('filePath');
const DBpath:string = path.join(__dirname,'../../server/',filePath);

// Function to read a json file
export const jsonReader =async():Promise<DBdata>=>{
	try{
		const data:string = await fs.promises.readFile(DBpath,'utf8');
		
		const Data:DBdata = JSON.parse(data);
		return Data;
	}
	catch(err:any){
		throw new Error(err);
	}
};


