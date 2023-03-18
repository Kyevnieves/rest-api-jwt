"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token)
        return res.status(401).json("Access denied");
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.userId = payload._id;
        req.userEmail = payload.email;
    }
    catch (err) {
        console.log(err);
    }
    next();
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map