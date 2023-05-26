import { Employee,validatorResult,Level,employeeSchema, DBdata } from '../models';
import { RequestHandler } from 'express';
import { jsonReader } from '../services';
import { validator } from '../utils';


// supervisor validation function.
export const supervisorValidator: RequestHandler = async (req, res,next) => {

	const newEmployee:Employee = (req.body as Employee);

	const validateResult: validatorResult = validator(newEmployee,employeeSchema);

	if (!validateResult.match) {
		return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
	}

	const newEmpsupervisorId:number = newEmployee.supervisorId;
	const newEmplevel:string = newEmployee.level.toLowerCase();

	const data:DBdata = await jsonReader();
	const empData:Employee[] = data.erp;
	res.locals.data = data;

	const empInd:number = empData.findIndex(emp => emp.empId == newEmpsupervisorId);

	if (empInd < 0) {
		return res.status(404).json({ success: false, message: 'Could not find supervisor with given Id' });
	}

	const supervisorLevel:string = empData[empInd].level;

	if(newEmplevel == Level.Intern){
		if(supervisorLevel === Level.Developer || supervisorLevel === Level.Tester){
			next();
		}
		else{
			return res.status(406).send({success : false, message:'intern can have only developer or tester as supervisor. Provide valid supervisorId.'});
		}
         
	}
	else if(newEmplevel === Level.Developer || newEmplevel === Level.Tester){
		if(supervisorLevel === Level.Manager){
			next();
		}
		else{
			return res.status(406).send({success : false, message:'developer/tester can have only manager as supervisor. Provide valid supervisorId.'});
		}
        
	}
	else if(newEmplevel === Level.Manager){
		if(supervisorLevel === Level.Manager){
			next();
		}
		else{
			return res.status(406).send({success : false, message:'manager can have only manager as supervisor. Provide valid supervisorId.'});
		}
        
	}
	else{
		return res.status(406).send({success : false, message:'Provided employee level should be from intern/test/developer/manager'});
	}
};
