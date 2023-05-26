export interface ProfessionalInfo {
    empId?: number;
    currentEmployeer: string;
    previousEmployeer: string;
    salary: number;
    highestEducation: string;
    highestEducationInstitute: string;
    highestEducationGrades: number;
}
// add reference keys for empID.
export const ProfessionalSchema = {
	'type': 'object',
	'properties': {
		'empId': {
			'type': 'integer'
		},
		'currentEmployeer': {
			'type': 'string'
		},
		'previousEmployeer': {
			'type': 'string'
		},
		'salary': {
			'type': 'integer'
		},
		'highestEducation': {
			'type': 'string'
		},
		'highestEducationInstitute': {
			'type': 'string'
		},
		'highestEducationGrades': {
			'type': 'integer'
		}
	},
	'required': [
		'currentEmployeer',
		'previousEmployeer',
		'salary',
		'highestEducation',
		'highestEducationInstitute',
		'highestEducationGrades'
	]
};
