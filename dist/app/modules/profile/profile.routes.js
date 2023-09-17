"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
// profile.routes.ts
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get('/:id', profile_controller_1.ProfileController.getUserProfile);
exports.profileRoutes = router;
