import { Employee } from "../models/ERP";
import { RequestHandler } from "express";
import { jsonReader } from "../services/jsonReader";

// supervisor validation function.
export const supervisorValidator: RequestHandler = async (req, res,next) => {

	const newEmployee = (req.body as Employee);

	const newEmpsupervisorId = newEmployee.supervisorId;
	const newEmplevel = newEmployee.level.toLowerCase();

	const data: Employee[] = await jsonReader();

	const empInd = data.findIndex(emp => emp.empId == newEmpsupervisorId);

	if (empInd < 0) {
		return res.status(404).json({ success: false, message: 'Could not find supervisor with given Id' });
	}

	const supervisorLevel = data[empInd].level;

	if(newEmplevel == 'intern'){
		if(supervisorLevel === 'developer' || supervisorLevel === 'tester'){
			next();
		}
		else{
			return res.status(401).send({success : false, message:'intern can have only developer or tester as supervisor. Provide valid supervisorId..'});
		}
	}
	else if(newEmplevel === 'developer' || newEmplevel === 'tester'){
		if(supervisorLevel === 'manager'){
			next();
		}
		else{
			return res.status(401).send({success : false, message:'developer/tester can have only manager as supervisor. Provide valid supervisorId..'});
		}
	}
	else if(newEmplevel === 'manager'){
		if(supervisorLevel === 'manager'){
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
