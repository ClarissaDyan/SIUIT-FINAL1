import express from 'express';
import { registerAccount, loginAccount, updateAccount, deleteAccount, authenticate, logoutAccount } from '../controller/AccountController.js';
import { createIncome, getIncomeById } from '../controller/IncomeController.js';
import { updateIncome } from '../controller/IncomeController.js';
import { deleteIncome } from '../controller/IncomeController.js';

//invoice route
import { createInvoice, getInvoiceById } from '../controller/InvoiceController.js';
import { updateInvoice } from '../controller/InvoiceController.js';
import { deleteInvoice } from '../controller/InvoiceController.js';
// import { getExpendituresByAccount } from '../controller/ExpenditureController.js';

const router = express.Router();

// Public routes account
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.get('/logout', logoutAccount);

// Protected routes accoumt
router.put('/update/:id', authenticate, updateAccount);
router.delete('/delete/:id', authenticate, deleteAccount);

// Invoice routes
router.post('/invoice', authenticate, createInvoice);
router.get('/invoice/:id', authenticate, getInvoiceById);
router.put('/invoice/:id', authenticate, updateInvoice);
router.delete('/invoice/:id', authenticate, deleteInvoice);

export default router;