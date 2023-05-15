"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmployees = void 0;
const jsonReader_1 = require("../services/jsonReader");
// Function to get all employee in ERP
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield (0, jsonReader_1.jsonReader)();
        res.status(200).json({ success: true, data: Data });
    }
    catch (err) {
        next(new Error(err));
    }
});
exports.getAllEmployees = getAllEmployees;
