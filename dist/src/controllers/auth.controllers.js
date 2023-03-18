"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importStar(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const collectionUsers = database_1.default.db("DB_jwt").collection("users");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = new User_1.default({
        username,
        email,
        password
    });
    user.password = yield (0, User_1.encryptPassword)(user.password);
    try {
        const response = yield collectionUsers.insertOne(user);
        console.log(response);
        res.json({
            "message": "Usuario creado exitosamente"
        });
    }
    catch (err) {
        console.log(err, string);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield collectionUsers.findOne({ email: email });
    if (!user)
        return res.status(400).json("Email o password wrong");
    const correctPassword = yield (0, User_1.validatePassword)(password, user.password);
    if (!correctPassword)
        return res.status(400).json("Invalid password");
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json({
        user,
        token
    });
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield collectionUsers.findOne({ email: req.userEmail });
    if (!user)
        return res.status(404).json("User not found");
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email
    });
});
exports.profile = profile;
//# sourceMappingURL=auth.controllers.js.map