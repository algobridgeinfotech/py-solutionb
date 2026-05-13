"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInquiry = void 0;
const express_validator_1 = require("express-validator");
exports.validateInquiry = [
    (0, express_validator_1.body)("customerName").trim().notEmpty().withMessage("Name is required").escape(),
    (0, express_validator_1.body)("customerEmail").isEmail().withMessage("Valid email is required").normalizeEmail(),
    (0, express_validator_1.body)("customerPhone").trim().notEmpty().withMessage("Phone number is required"),
    (0, express_validator_1.body)("productName").trim().notEmpty().withMessage("Product name is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
