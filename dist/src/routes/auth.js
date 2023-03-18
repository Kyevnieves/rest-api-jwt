"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const verifyToken_1 = require("../libs/verifyToken");
const auth_controllers_1 = require("../controllers/auth.controllers");
router.post('/signup', auth_controllers_1.signup);
router.post('/signin', auth_controllers_1.signin);
// RUTA PROTEGIDA
router.get('/profile', verifyToken_1.TokenValidation, auth_controllers_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map