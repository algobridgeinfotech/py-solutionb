import { Router } from 'express';
import { 
  createInquiry, 
  getAllInquiries, 
  updateInquiryStatus, 
  deleteInquiry 
} from '../controllers/inquiry.controller';

import { authenticateAdmin } from '../middleware/auth.middleware';

import { validateInquiry } from '../middleware/validation.middleware';

const router = Router();

// Public route for customers to submit inquiries (with validation)
router.post('/', validateInquiry, createInquiry);

// Protected Admin Routes for managing inquiries
router.get('/', authenticateAdmin, getAllInquiries);
router.patch('/:id/status', authenticateAdmin, updateInquiryStatus);
router.delete('/:id', authenticateAdmin, deleteInquiry);

export default router;
