import fs from 'fs';
import config from 'config';
import { Employee } from '../models/Employee';

const filePath = config.get('filePath');
const DBpath = __dirname+'../../../server/'+filePath;

// Function to read a json file
export const jsonReader =async()=>{
	try{
		const data:string = await fs.promises.readFile(DBpath,'utf8');
		if(data.length ==0){
			return [];
		}
		const Data:Employee[] = JSON.parse(data);
		return Data;
	}
	catch(err:any){
		throw new Error(err);
	}
};


