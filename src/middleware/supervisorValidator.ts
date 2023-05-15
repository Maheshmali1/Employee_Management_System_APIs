import { Employee } from '../models/Employee';
import { RequestHandler } from 'express';
import { jsonReader } from '../services/jsonReader';
import { Level } from '../models/levels';

// supervisor validation function.
export const supervisorValidator: RequestHandler = async (req, res,next) => {

	const newEmployee = (req.body as Employee);

	const newEmpsupervisorId = newEmployee.supervisorId;
	const newEmplevel = newEmployee.level.toLowerCase();

	const data: Employee[] = await jsonReader();
	res.locals.empData = data;

	const empInd = data.findIndex(emp => emp.empId == newEmpsupervisorId);

	if (empInd < 0) {
		return res.status(404).json({ success: false, message: 'Could not find supervisor with given Id' });
	}

	const supervisorLevel = data[empInd].level;

	if(newEmplevel == Level.Intern){
		if(supervisorLevel === Level.Developer || supervisorLevel === Level.Tester){
			next();
		}
		else{
			return res.status(401).send({success : false, message:'intern can have only developer or tester as supervisor. Provide valid supervisorId..'});
		}
         
	}
	else if(newEmplevel === Level.Developer || newEmplevel === Level.Tester){
		if(supervisorLevel === Level.Manager){
			next();
		}
		else{
			return res.status(401).send({success : false, message:'developer/tester can have only manager as supervisor. Provide valid supervisorId..'});
		}
        
	}
	else if(newEmplevel === Level.Manager){
		if(supervisorLevel === Level.Manager){
			next();
		}
		else{
			return res.status(401).send({success : false, message:'manager can have only manager as supervisor. Provide valid supervisorId..'});
		}
        
	}
	else{
		return res.status(401).send({success : false, message:' Provided employee level should be from intern/test/developer/manager'});
	}
};
