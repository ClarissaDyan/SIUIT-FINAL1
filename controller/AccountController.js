import Account from '../model/AccountModel.js';
import bcrypt from 'bcrypt';

//registerAccount untuk mendaftar akun baru dengan mengambil data name, username, email, password, dan confirmPassword
export const registerAccount = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;
	if (password !== confirmPassword) { //periksa apakah password dan confirmPassword sama, jika tidak, user diarahkan ke page register dengan pesan error
  		return res.redirect('/register?error=notmatch');
	}
    //cek username dan email di database apakah sudah pernah dipakai, kalau ada, user diarahkan ke page register dengan pesan error
		const userExist = await Account.findOne({ $or: [{ email }, { username }] 	});
	if (userExist) {
  		return res.redirect('/register?error=exists');
	}

    //jika sudah aman , password user akan diacak agar lebih aman pakai bcrypt  
    const hashedPassword = await bcrypt.hash(password, 10);
    //data new user akan disimpan ke database
    await Account.create({ name, username, email, password: hashedPassword });

    //setelah berhasil daftar, user diarahkan ke page login
    res.redirect('/login');
  } catch (error) {
    res.redirect('/register?error=server');
  }
};

//loginAccount untuk masuk ke akun
export const loginAccount = async (req, res) => {
  try {
    //ambil data username dan password dari user
    const { username, password } = req.body;
    
    //cek database apakah ada username yang sama, kalu tidak, user diarahkan page login dengan pesan error
    const user = await Account.findOne({ username });
    if (!user) {
      return res.redirect('/login?error=UserNotFound');
    }

    //cek apakah password yang diinput cocok dengan yang di database, kalau tidak, pengguna diarahkan ke page login dengan pesan error
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.redirect('/login?error=wrongPassword');
    }

    //kalau sudah cocok, buat cookie untuk simpan informasi pengguna 
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