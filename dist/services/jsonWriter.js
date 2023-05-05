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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonWriter = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config"));
const jsonReader_1 = require("./jsonReader");
const filePath = config_1.default.get('filePath');
const DBpath = __dirname + '../../../server/' + filePath;
// Function to write to json file.
const jsonWriter = (newEmpData, flag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Data = yield (0, jsonReader_1.jsonReader)();
        if (flag) {
            Data.push(newEmpData);
        }
        else {
            Data = newEmpData;
        }
        yield fs_1.default.promises.writeFile(DBpath, JSON.stringify(Data, null, 2));
        return true;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.jsonWriter = jsonWriter;