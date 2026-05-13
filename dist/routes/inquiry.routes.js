"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inquiry_controller_1 = require("../controllers/inquiry.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Public route for customers to submit inquiries (with validation)
router.post('/', validation_middleware_1.validateInquiry, inquiry_controller_1.createInquiry);
// Protected Admin Routes for managing inquiries
router.get('/', auth_middleware_1.authenticateAdmin, inquiry_controller_1.getAllInquiries);
router.patch('/:id/status', auth_middleware_1.authenticateAdmin, inquiry_controller_1.updateInquiryStatus);
router.delete('/:id', auth_middleware_1.authenticateAdmin, inquiry_controller_1.deleteInquiry);
exports.default = router;
