import Account from '../model/AccountModel.js';
import bcrypt from 'bcrypt';

export const registerAccount = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;
	if (password !== confirmPassword) {
  		return res.redirect('/register?error=notmatch');
	}

		const userExist = await Account.findOne({ $or: [{ email }, { username }] 	});
	if (userExist) {
  		return res.redirect('/register?error=exists');
	}

    const hashedPassword = await bcrypt.hash(password, 10);
    await Account.create({ name, username, email, password: hashedPassword });

    res.redirect('/login');
  } catch (error) {
    res.redirect('/register?error=server');
  }
};

export const loginAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Account.findOne({ username });
    if (!user) {
      return res.redirect('/login?error=UserNotFound');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.redirect('/login?error=wrongPassword');
    }
    res.cookie('user', user._id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/menu');
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