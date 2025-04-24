import express from 'express';
import { registerAccount, loginAccount, updateAccount, deleteAccount, authenticate, logoutAccount } from '../controller/AccountController.js';

//income route
import { createIncome, getIncomeById } from '../controller/IncomeController.js';
import { updateIncome } from '../controller/IncomeController.js';
import { deleteIncome } from '../controller/IncomeController.js';

//invoice route
import { createInvoice, getInvoiceById } from '../controller/InvoiceController.js';
import { updateInvoice } from '../controller/InvoiceController.js';
import { deleteInvoice } from '../controller/InvoiceController.js';

//expenditure route
import { createExpenditure, getExpenditureById} from '../controller/ExpenditureController.js';
import { updateExpenditure } from '../controller/ExpenditureController.js';
import { deleteExpenditure } from '../controller/ExpenditureController.js';

//installment route
import { createInstalment, getInstalmentById } from '../controller/InstalmentController.js';
import { updateInstalment } from '../controller/InstalmentController.js';
import { deleteInstalment } from '../controller/InstalmentController.js';

const router = express.Router();

// Public routes account
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.get('/logout', logoutAccount);

// Protected routes account
router.put('/update/:id', authenticate, updateAccount);
router.delete('/delete/:id', authenticate, deleteAccount);

// Income routes
router.post('/income', authenticate, createIncome);
router.get('/income/:id', authenticate, getIncomeById);
router.put('/income/:id', authenticate, updateIncome);
router.delete('/income/:id', authenticate, deleteIncome);

// Invoice routes
router.post('/invoice', authenticate, createInvoice);
router.get('/invoice/:id', authenticate, getInvoiceById);
router.put('/invoice/:id', authenticate, updateInvoice);
router.delete('/invoice/:id', authenticate, deleteInvoice);

//Expenditure routes
router.post('/expenditure', authenticate, createExpenditure);
router.get('/expenditure/:id', authenticate, getExpenditureById);
router.put('/expenditure/:id', authenticate, updateExpenditure);
router.delete('/expenditure/:id', authenticate, deleteExpenditure);

//instalment routes
router.post('/instalment', authenticate, createInstalment);
router.get('/instalment/:id', authenticate, getInstalmentById);
router.put('/instalment/:id', authenticate, updateInstalment);
router.delete('/instalment/:id', authenticate, deleteInstalment);

export default router;