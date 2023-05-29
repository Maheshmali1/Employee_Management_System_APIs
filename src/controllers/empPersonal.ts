import { RequestHandler } from 'express';
import { jsonReader,jsonWriter } from '../services';
import { validator } from '../utils';
import { DBdata,validatorResult,PersonalInfo,personalSchema } from '../models';


let empId = 1;
export const createPersonalInfo: RequestHandler = (req, res, next) => {
	const personalData: PersonalInfo = (req.body as PersonalInfo);
	personalData.empId = empId;
	empId++;

	const validateResult: validatorResult = validator(personalData, personalSchema);

	if (!validateResult.match) {
		return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
	}



	return jsonReader()
		.then((data:DBdata) => {
			data.personal.push(personalData);
			return jsonWriter(data)
				.then((result:boolean) => {
					if (result) {
						return res.status(200).json({ success: true, data: personalData });
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

export const getPersonalInfo: RequestHandler = (req, res, next) => {


	const empId: string = (req.params as { id: string }).id;

	return jsonReader()
		.then((data:DBdata) => {
			const personalData: PersonalInfo[] = data.personal;
			const personalInd:number = personalData.findIndex(emp => emp.empId == parseInt(empId));

			if (personalInd < 0) {
				return res.status(404).json({ success: false, message: 'Could not find Employee personal data with given Id' });
			}


			const validateResult: validatorResult = validator(personalData[personalInd], personalSchema);

			if (!validateResult.match) {
				return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message } });
			}

			return res.status(200).json({ success: true, data: personalData[personalInd] });

		})
		.catch((err: any) => {
			next(new Error(err));
		}); 
};
