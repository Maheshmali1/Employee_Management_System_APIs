"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalSchema = void 0;
// add reference keys for empID.
exports.ProfessionalSchema = {
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
