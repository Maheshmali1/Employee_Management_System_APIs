"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const routes_1 = require("../routes");
const swaggerDocs = yamljs_1.default.load('./api.yaml');
// Function to creater server in express.
const createServer = () => {
    const app = (0, express_1.default)();
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    app.use(express_1.default.json());
    app.use('/erp', routes_1.erpRouter);
    app.use('/personal', routes_1.personalRouter);
    app.use('/professional', routes_1.professionalRouter);
    app.use((err, req, res) => {
        res.status(500).send({ success: false, message: err.message });
    });
    return app;
};
exports.createServer = createServer;
