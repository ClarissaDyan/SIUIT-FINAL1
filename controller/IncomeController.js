import Income from '../model/IncomeModel.js';
import Account from '../model/AccountModel.js';

export const createIncome = async (req, res) => {
    try {
        const { amount, date, description, category } = req.body;
        const account = req.cookies.user; // get user id dari cookie

        // cek apakah ada akunnya
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

export const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(400).json({ message: 'Income not found' });
        }
        res.status(200).json({ income });
    } catch (error) {
        res.statuc(500).json({ message: error.message});
    }
};

export const updateIncome = async (req, res) => {
    try {
      const { amount, date, description, category } = req.body;
      const account = req.cookies.user;
      
      const income = await Income.findByIdAndUpdate(
        req.params.id,
        { amount, date, description, category, account },
        { new: true }
      );
      
      if (!income) {
        return res.status(404).json({ message: 'Income not found' });
      }
      
      res.status(200).json({ message: 'Income updated successfully', income });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

