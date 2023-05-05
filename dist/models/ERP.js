"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
// employee schema
exports.employeeSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "DOB": {
            "type": "string",
            "format": "date"
        },
        "skills": {
            "type": "array",
            "minItems": 0,
            "maxItems": 1000,
            "items": {
                "type": "string"
            },
        },
        "DOJ": {
            "type": "string",
            "format": "date"
        },
        "level": {
            "type": "string"
        },
        "supervisorId": {
            "type": "integer"
        },
        "empId": {
            "type": "integer"
        }
    },
    "required": [
        "name",
        "DOB",
        "skills",
        "DOJ",
        "level",
        "supervisorId"
    ]
};
