import Expenditure from '../model/ExpenditureModel.js';
import Account from '../model/AccountModel.js';

//Fungsi untuk memasukkan data pengeluaran baru ke dalam database
export const createExpenditure = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const account = req.cookies.user; // Get user ID from cookie
    
    const accountExists = await Account.findById(account); //memeriksa keberadaan akun
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    
    //membuat data pengeluaran baru ke dalam database
    const expenditure = await Expenditure.create({ amount, date, description, category, account });
    res.status(201).json({ message: 'Expenditure created successfully', expenditure });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk memilih pengeluaran berdasarkan id agar data user tidak muncul di tampilan daftar pengeluaran dengan id lain
export const getExpenditureById = async (req, res) => {
  try {
    const expenditure = await Expenditure.findById(req.params.id);
    if (!expenditure) {
      return res.status(404).json({ message: 'Expenditure not found' });
    }
    res.status(200).json({ expenditure });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk memperbarui data pengeluaran yang sudah pernah diinput user ke dalam database
export const updateExpenditure = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const account = req.cookies.user;
    
    const expenditure = await Expenditure.findByIdAndUpdate(
      req.params.id,
      { amount, date, description, category, account },
      { new: true }
    );
    
    if (!expenditure) {
      return res.status(404).json({ message: 'Expenditure not found' });
    }
    
    res.status(200).json({ message: 'Expenditure updated successfully', expenditure });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk menghapus data pengeluaran yang sudah pernah diinput user ke dalam database
export const deleteExpenditure = async (req, res) => {
  try {
    const expenditure = await Expenditure.findByIdAndDelete(req.params.id);
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!expenditure) {
      return res.status(400).json({ message: 'Expenditure not found' });
    }
    if (!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Expenditure deleted successfully', expenditure });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
