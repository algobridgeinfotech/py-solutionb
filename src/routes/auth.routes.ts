import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register); // Only for initial setup or by superadmin

export default router;
