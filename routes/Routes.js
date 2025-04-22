import express from 'express';
import { registerAccount, loginAccount, updateAccount, deleteAccount, authenticate, logoutAccount } from '../controller/AccountController.js';

const router = express.Router();

// Public routes
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.get('/logout', logoutAccount);

// Protected routes
router.put('/update/:id', authenticate, updateAccount);
router.delete('/delete/:id', authenticate, deleteAccount);

export default router;