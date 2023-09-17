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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const insertIntoDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.insertIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Create successfully!',
        data: result,
    });
}));
const getAllData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetch successfully',
        data: result,
    });
}));
const getOrdersForSpecificCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield order_service_1.OrderService.getOrdersForSpecificCustomer(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order for Specific Customer  fetch successfully',
        data: result,
    });
}));
const getSingleOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const orderId = req.params.orderId;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role; // Extract the user's role from the decoded token
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId; // Extract the user's ID from the decoded token
        if (!userRole || !userId) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized: Access denied',
            });
        }
        // Check if the user is an admin (no further checks required)
        if (userRole === 'admin') {
            const order = yield order_service_1.OrderService.getOrderByOrderId(orderId);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: 'Order not found',
                });
            }
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Order fetched successfully',
                data: order,
            });
        }
        // If the user is a customer, verify that the order belongs to them
        const order = yield order_service_1.OrderService.getOrderByOrderId(orderId);
        if (!order || order.userId !== userId) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: 'Unauthorized: Access denied',
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Order fetched successfully',
            data: order,
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
exports.OrderController = {
    insertIntoDb,
    getAllData,
    getOrdersForSpecificCustomer,
    getSingleOrderById,
};
