import {validatorResult } from '../models';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);


// Function to validate the employee against schema.
export const validator = (employee:any, schema:any):validatorResult=>{
	const validate = ajv.compile(schema);
	const match:boolean = validate(employee);
	const errors:ErrorObject<string, Record<string, any>, unknown>[] | null | undefined = (!match)? validate.errors : [];
	return {
		match,
		errors
	};
};
