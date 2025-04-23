import Instalment from '../model/InstalmentModel.js';
import Account from '../model/AccountModel.js';

export const createInstalment = async (req, res) => {
  try {
    const { name, amount, tenor, date } = req.body;
    const account = req.cookies.user; // Get user ID from cookie
    
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    
    const instalment = await Instalment.create({ name, amount, tenor, date, account });
    res.status(201).json({ message: 'Instalment created successfully', instalment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstalmentsByAccount = async (req, res) => {
  try {
    const instalments = await Instalment.find({ account: req.params.id });
    res.status(200).json({ instalments });
    const accountExists = await Account.findById(account);
    if (!accountExists) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!instalments) {
      return res.status(400).json({ message: 'No instalments found' });
    }
    if(!account) {
      return res.status(400).json({ message: 'Account not found' });
    }
    res.status(200).json({ instalments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const deleteInstalment = async (req, res) => {
  try {
    const instalment = await Instalment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Instalment deleted successfully', instalment });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

