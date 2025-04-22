import Invoice from '../model/InvoiceModel.js';
import Account from '../model/AccountModel.js';

export const createInvoice = async (req, res) => {
  try {
    const { name, amount, date, account } = req.body;
    const invoice = await Invoice.create({ name, amount, date, account });
    if (!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoicesByAccount = async (req, res) => {
  try {
    const invoices = await Invoice.find({ account: req.params.id });
    res.status(200).json({ invoices });
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!invoices) {
      return res.status(400).json({ message: 'No invoices found' });
    }
    if(!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { name, amount, date, account } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { name, amount, date, account });
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
    }
    if (!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Invoice deleted successfully', invoice });
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
    }
    if (!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};