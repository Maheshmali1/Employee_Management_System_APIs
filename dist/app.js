"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./utils/server");
const app = (0, server_1.createServer)();
app.listen(3000, () => {
    console.log('server listening on port 3000..');
});
