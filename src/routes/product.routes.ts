import { Router } from 'express';
import { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller';

import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected Admin Routes
router.post('/', authenticateAdmin, createProduct);
router.put('/:id', authenticateAdmin, updateProduct);
router.delete('/:id', authenticateAdmin, deleteProduct);

export default router;
