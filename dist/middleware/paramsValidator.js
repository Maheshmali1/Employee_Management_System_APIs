"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsValidator = void 0;
const paramsValidator = (req, res, next) => {
    const empId = req.params.id;
    if (!empId.match(/^[0-9]+$/)) {
        return res.status(406).json({ success: false, message: 'Invalid type of employee id. It should be integer' });
    }
    next();
};
exports.paramsValidator = paramsValidator;
