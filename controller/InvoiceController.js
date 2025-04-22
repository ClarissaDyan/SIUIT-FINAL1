import Invoice from '../model/InvoiceModel.js';
import Account from '../model/AccountModel.js';

export const createInvoice = async (req, res) => {
  try {
    const { name, amount, date} = req.body;
    const account = req.cookies.user;
    // buat ngecek create
    const invoice = await Invoice.create({ name, amount, date, account });
   
    
    // cek akun ada atau tidak
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
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }

    // dapatkan semua income berdasarkan akun
    const invoices = await Invoice.find({ account: req.params.id});

    if (!invoices) {
      return res.status(400).json({ message: 'No invoices found' });
    }
    
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json({ invoice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updateInvoice = async (req, res) => {
  try {
    const { name, amount, date} = req.body;
    const account = req.cookies.user;

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { name, amount, date, account },
        {new: true}
    );

   
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
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

    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
    }
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};