import { RequestHandler } from 'express';

export const paramsValidator:RequestHandler = (req,res,next)=>{
	const empId: string = (req.params as { id: string }).id;

	if(!empId.match(/^[0-9]+$/)){
		return res.status(406).json({success:false, message:'Invalid type of employee id. It should be integer'});
	}
	next();
};