import Instalment from '../model/InstalmentModel.js';
import Account from '../model/AccountModel.js';

//Fungsi untuk memasukkan data cicilan baru ke dalam database
export const createInstalment = async (req, res) => {
  try {
    const { name, amount, tenor, date } = req.body;
    const account = req.cookies.user; // Get user ID from cookie
    
    //memeriksa keberadaan akun
    const accountExists = await Account.findById(account); //memeriksa keberadaan akun
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    
    //membuat data cicilan baru ke dalam database
    const instalment = await Instalment.create({ name, amount, tenor, date, account });
    res.status(201).json({ message: 'Instalment created successfully', instalment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk memilih cicilan berdasarkan id agar data user tidak muncul di tampilan daftar cicilan dengan id lain
export const getInstalmentById = async (req, res) => {
  try {
    const instalment = await Instalment.findById(req.params.id);
    if (!instalment) {
      return res.status(404).json({ message: 'Instalment not found' });
    }
    res.status(200).json({ instalment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk memperbarui data cicilan yang sudah pernah diinput user ke dalam database
export const updateInstalment = async (req, res) => {
  try {
    const { name, amount, tenor, date, account } = req.body;
    const instalment = await Instalment.findByIdAndUpdate(req.params.id, { name, amount, tenor, date, account });
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!instalment) {
      return res.status(400).json({ message: 'Instalment not found' });
    }
    if (!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Instalment updated successfully', instalment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fungsi untuk menghapus data cicilan yang sudah pernah diinput user ke dalam database
export const deleteInstalment = async (req, res) => {
  try {
    const instalment = await Instalment.findByIdAndDelete(req.params.id);
    const account = req.cookies.user;
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!instalment) {
      return res.status(400).json({ message: 'Instalment not found' });
    }
    res.status(200).json({ message: 'Instalment deleted successfully', instalment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};