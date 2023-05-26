export interface PersonalInfo{
    empId?:number;
    address:string;
    phoneNo:string;
    emailId:string;
    age:number;
    bloodGroup:string;
    hobbies:string[];
    married:string;
    workingProfessional:string;
}


export const personalSchema = {
	'type': 'object',
	'properties': {
		'empId': {
			'type': 'integer'
		},
		'address': {
			'type': 'string'
		},

		'phoneNo': {
			'type': 'string',
			'pattern': '^[0-9]{10}$'
		},

		'emailId': {
			'type': 'string',
			'format':'email'
		},

		'age': {
			'type': 'integer'
		},
		'bloodGroup':{
			'type':'string'
		},
		'hobbies':{
			'type':'array',
			'items':{
				'type':'string'
			}
		},
		'married':{
			'type':'string'
		},
		'workingProfessional':{
			'type':'string'
		}
	},

	'required': [
		'address',
		'phoneNo',
		'emailId',
		'age',
		'bloodGroup',
		'hobbies',
		'married',
		'workingProfessional'
	]
};


