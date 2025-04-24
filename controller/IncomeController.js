// Import model Income dan Account dari folder model
import Income from '../model/IncomeModel.js';
import Account from '../model/AccountModel.js';

// Fungsi untuk menambahkan data pemasukan baru
export const createIncome = async (req, res) => {
    try {
      // Ambil data dari permintaan user yang dikirim dari form 
        const { amount, date, description, category } = req.body;
        const account = req.cookies.user; // get user id dari cookie

        // cek apakah account nya sudah ada
        const accountExists = await Account.findById(account);
        if(!accountExists) {
            return res.status(400).json({ message: 'Account not found' });
        }

        // membuat income baru
        const income = await Income.create({ amount, date, description, category, account });

        res.status(201).json({ message: 'Income created successfully', income });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk mendapatkan income berdasarkan ID-nya
export const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);// ambil income berdasarkan ID dari URL
        if (!income) {
            return res.status(400).json({ message: 'Income not found' });// error message 
        }
        res.status(200).json({ income });// kalau ada incomenya maka ia mengirimkan data
    } catch (error) {
        res.statuc(500).json({ message: error.message});
    }
};


// Fungsi untuk update data pemasukan
export const updateIncome = async (req, res) => {
    try {
      const { amount, date, description, category } = req.body;
      const account = req.cookies.user;
      
      // Cari income berdasarkan ID lalu update yang sudah diubah
      const income = await Income.findByIdAndUpdate(
        req.params.id,
        { amount, date, description, category, account },
        { new: true }
      );
      
      if (!income) {
        return res.status(404).json({ message: 'Income not found' });// jika incomenya tidak ditemukan
      }
      
      res.status(200).json({ message: 'Income updated successfully', income });// mucul jik berhasil di update
    } catch (error) {
      res.status(500).json({ message: error.message });// jika ada error
    }
  };

  // fungsi menghapus income yang sudah ada
  export const deleteIncome = async (req, res) => {
    try {
      // hapus income berdasarkan idnya
      const income = await Income.findByIdAndDelete(req.params.id);
      if (!income) {
        return res.status(400).json({ message: 'Income not found' });
      }
      //mengcek akun dari income masih ada atau tidak
      const accountExists = await Account.findById(income.account);
      if (!accountExists) {
        return res.status(400).json({ message: 'Account not found' });
      }
      // respon jika income sudah berhasil di delete
      res.status(200).json({ message: 'Income deleted successfully', income });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

