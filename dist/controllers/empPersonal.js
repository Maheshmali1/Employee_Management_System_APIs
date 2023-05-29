"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalInfo = exports.createPersonalInfo = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const models_1 = require("../models");
let empId = 1;
const createPersonalInfo = (req, res, next) => {
    var _a, _b;
    const personalData = req.body;
    personalData.empId = empId;
    empId++;
    const validateResult = (0, utils_1.validator)(personalData, models_1.personalSchema);
    if (!validateResult.match) {
        return res.status(422).json({ success: false, message: { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message } });
    }
    return (0, services_1.jsonReader)()
        .then((data) => {
        data.personal.push(personalData);
        return (0, services_1.jsonWriter)(data)
            .then((result) => {
            if (result) {
                return res.status(200).json({ success: true, data: personalData });
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
exports.createPersonalInfo = createPersonalInfo;
const getPersonalInfo = (req, res, next) => {
    const empId = req.params.id;
    return (0, services_1.jsonReader)()
        .then((data) => {
        var _a, _b;
        const personalData = data.personal;
        const personalInd = personalData.findIndex(emp => emp.empId == parseInt(empId));
        if (personalInd < 0) {
            return res.status(404).json({ success: false, message: 'Could not find Employee personal data with given Id' });
        }
        const validateResult = (0, utils_1.validator)(personalData[personalInd], models_1.personalSchema);
        if (!validateResult.match) {
            return res.status(422).json({ success: false, message: { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message } });
        }
        return res.status(200).json({ success: true, data: personalData[personalInd] });
    })
        .catch((err) => {
        next(new Error(err));
    });
};
exports.getPersonalInfo = getPersonalInfo;
