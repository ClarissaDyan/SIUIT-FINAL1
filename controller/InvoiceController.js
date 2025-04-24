// Import model Invoice dan Account
import Invoice from '../model/InvoiceModel.js';
import Account from '../model/AccountModel.js';

// Fungsi untuk membuat invoice baru
export const createInvoice = async (req, res) => {
  try {
    const { name, amount, date} = req.body;
     // Ambil id akun dari cookies user
    const account = req.cookies.user;
    // membuat invoice baru
    const invoice = await Invoice.create({ name, amount, date, account });
   
    
    // cek akun ada atau tidak
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    //message kalau sudah sucess membuat invoice
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    //message error
    res.status(500).json({ message: error.message });
  }
};

// fungsi mengambil invoice dari id
export const getInvoiceById = async (req, res) => {
    try {
      //mencari incoive dengan id dari url
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json({ invoice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Fungsi mengupdate invoice berdasarkan id
export const updateInvoice = async (req, res) => {
  try {
    //ambil data
    const { name, amount, date} = req.body;
    const account = req.cookies.user;

    //cari dan update invoice berdasarka idnya
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { name, amount, date, account },
        {new: true}// return data terbaru
    );

   
    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi menghapus invoice 
export const deleteInvoice = async (req, res) => {
  try {
    // mencari dan menghapus invoice berdasarkan id
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Invoice deleted successfully', invoice });

    if (!invoice) {
      return res.status(400).json({ message: 'Invoice not found' });
    }
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};