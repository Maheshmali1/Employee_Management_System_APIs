import { ErrorObject } from "ajv/dist/types";
// Employee data type 
export interface Employee{
    empId?:number,
    name:string,
    DOB: string,
    skills:string[],
    DOJ: string,
    level:string,
    supervisorId:number
}

// Validator result type
export type validatorResult={
    match: boolean;
    errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
}

// employee schema
export const employeeSchema = {
	"type": "object",
	"properties": {
		"name": {
			"type": "string"
		},
		"DOB": {
			"type": "string",
			"format": "date"
		},
		"skills": {
			"type": "array",
			"minItems":0,
			"maxItems":1000,
			"items": {
				"type": "string"
			}
			,
        
		},
		"DOJ": {
			"type": "string",
			"format": "date"
		},
		"level": {
			"type": "string"
		},
		"supervisorId": {
			"type": "integer"
		},
		"empId": {
			"type": "integer"
		}
	},
	"required": [
		"name",
		"DOB",
		"skills",
		"DOJ",
		"level",
		"supervisorId"
	]
};