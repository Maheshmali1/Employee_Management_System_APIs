import { ErrorObject } from 'ajv/dist/types';
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

