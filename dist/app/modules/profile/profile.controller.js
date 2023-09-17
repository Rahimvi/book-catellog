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
exports.ProfileController = void 0;
const profile_service_1 = require("./profile.service");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Extract the user's ID from the decoded token
        if (!userId) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized: Access denied',
            });
        }
        const userProfile = yield profile_service_1.ProfileService.getUserProfileById(userId);
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'User profile not found',
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User profile retrieved successfully',
            data: userProfile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
});
exports.ProfileController = {
    getUserProfile,
};
