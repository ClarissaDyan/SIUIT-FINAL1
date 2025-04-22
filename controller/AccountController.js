import Account from '../model/AccountModel.js';
import bcrypt from 'bcrypt';

export const registerAccount = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    const userExist = await Account.findOne({ email, username });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Account.create({ name, username, email, password: hashedPassword });
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAccount = async (req, res) => {
  try {
    console.log("tes1");
    const { username, password } = req.body;
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    res.cookie('user', user._id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/menu');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAccount = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;
    const user = await Account.findByIdAndUpdate(req.params.id, { name, username, email, password, confirmPassword });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await Account.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authenticate = (req, res, next) => {
  const userId = req.cookies.user;
  if (!userId) {
    // Redirect ke halaman login jika tidak ada cookie
    return res.redirect('/login');
  }
  next();
};

export const logoutAccount = async (req, res) => {
  try {
    // Hapus cookie
    res.clearCookie('user');
    // Redirect ke halaman login
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambahkan middleware baru untuk halaman login/register
export const redirectIfAuthenticated = (req, res, next) => {
  const userId = req.cookies.user;
  if (userId) {
    // Redirect ke menu jika sudah login
    return res.redirect('/menu');
  }
  next();
};