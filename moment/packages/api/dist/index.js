"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// packages/api/src/index.ts
const server_1 = require("@trpc/server");
// 2. Pass the Context type to initTRPC
const t = server_1.initTRPC.context().create(); // 👈 Fix here
// Base router for all procedures
exports.appRouter = t.router({
// ... (procedures)
});
// ... (rest of the file)
