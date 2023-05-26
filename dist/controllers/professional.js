"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfessionalInfo = exports.createProfessionalInfo = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
let empId = 1;
const createProfessionalInfo = (req, res, next) => {
    const professionalData = req.body;
    professionalData.empId = empId;
    empId++;
    const validateResult = (0, utils_1.validator)(professionalData, models_1.ProfessionalSchema);
    if (!validateResult.match) {
        return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
    }
    return (0, services_1.jsonReader)()
        .then((data) => {
        data.professional.push(professionalData);
        return (0, services_1.jsonWriter)(data)
            .then((result) => {
            if (result) {
                return res.status(200).json({ success: true, data: professionalData });
            }
            else {
                return next(new Error('Unable to write to the Database..'));
            }
        });
    })
        .catch((err) => {
        next(new Error(err));
    });
};
exports.createProfessionalInfo = createProfessionalInfo;
const getProfessionalInfo = (req, res, next) => {
    const empId = req.params.id;
    return (0, services_1.jsonReader)()
        .then((data) => {
        const professionalData = data.professional;
        const professionalInd = professionalData.findIndex(emp => emp.empId == parseInt(empId));
        if (professionalInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee Professional data with given Id' });
        }
        const validateResult = (0, utils_1.validator)(professionalData[professionalInd], models_1.ProfessionalSchema);
        if (!validateResult.match) {
            return res.status(422).json({ success: false, message: { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message } });
        }
        return res.status(200).json({ success: true, data: professionalData[professionalInd] });
    })
        .catch((err) => {
        next(new Error(err));
    });
};
exports.getProfessionalInfo = getProfessionalInfo;
