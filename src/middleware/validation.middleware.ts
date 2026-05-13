import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateInquiry = [
  body("customerName").trim().notEmpty().withMessage("Name is required").escape(),
  body("customerEmail").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("customerPhone").trim().notEmpty().withMessage("Phone number is required"),
  body("productName").trim().notEmpty().withMessage("Product name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
