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
