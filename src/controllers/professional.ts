import { RequestHandler } from 'express';
import { ProfessionalInfo,ProfessionalSchema,DBdata,validatorResult } from '../models';
import { jsonReader,jsonWriter } from '../services';
import { validator } from '../utils';


let empId = 1;
export const createProfessionalInfo: RequestHandler = (req, res, next) => {
	const professionalData: ProfessionalInfo = (req.body as ProfessionalInfo);

	professionalData.empId = empId;
	empId++;

	const validateResult: validatorResult = validator(professionalData, ProfessionalSchema);

	if (!validateResult.match) {
		return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
	}



	return jsonReader()
		.then((data:DBdata) => {
			data.professional.push(professionalData);
			return jsonWriter(data)
				.then((result:boolean) => {
					if (result) {
						return res.status(200).json({ success: true, data: professionalData });
					}
					else {
						return next(new Error('Unable to write to the Database..'));
					}
				});
		})
		.catch((err: any) => {
			next(new Error(err));
		});
};

export const getProfessionalInfo: RequestHandler = (req, res, next) => {


	const empId: string = (req.params as { id: string }).id;

	return jsonReader()
		.then((data:DBdata) => {
			const professionalData: ProfessionalInfo[] = data.professional;
			const professionalInd:number = professionalData.findIndex(emp => emp.empId == parseInt(empId));

			if (professionalInd < 0) {
				return res.status(404).json({ success: false, message: 'Could not find Employee Professional data with given Id' });
			}


			const validateResult: validatorResult = validator(professionalData[professionalInd], ProfessionalSchema);

			if (!validateResult.match) {
				return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } });
			}

			return res.status(200).json({ success: true, data: professionalData[professionalInd] });

		})
		.catch((err: any) => {
			next(new Error(err));
		}); 
};
