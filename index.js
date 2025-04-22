import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Routes from './routes/Routes.js';
import cookieParser from 'cookie-parser';
// import Instalment from './model/InstalmentModel.js';
// import Expenditure from './model/ExpenditureModel.js';
// import Income from './model/IncomeModel.js';
import { authenticate, redirectIfAuthenticated } from './controller/AccountController.js';

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});

app.use('/api', Routes);
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Public routes (tidak perlu login)
app.get('/', redirectIfAuthenticated, function(req, res) {
    res.render('pages/index');
});

app.get('/login', redirectIfAuthenticated, function(req, res) {
    res.render('pages/login');
});

app.get('/register', redirectIfAuthenticated, function(req, res) {
    res.render('pages/register');
});

// Protected routes (perlu login)
app.get('/menu', authenticate, function(req, res) {
    res.render('pages/menu');
});

app.get('/pengeluaran', authenticate, async function(req, res) {
    try {
        const expenditures = await Expenditure.find({ account: req.cookies.user });
        res.render('pages/pengeluaran', { expenditures });
    } catch (error) {
        res.redirect('/login');
    }
});

app.get('/pendapatan', authenticate, async function(req, res) {
    try {
        const incomes = await Income.find({ account: req.cookies.user });
        res.render('pages/pendapatan', { incomes });
    } catch (error) {
        res.redirect('/login');
    }
});

app.get('/tagihan', authenticate, function(req, res) {
    res.render('pages/tagihan');
});

app.get('/cicilan', authenticate, async function(req, res) {
    try {
        const instalments = await Instalment.find({ account: req.cookies.user });
        res.render('pages/cicilan', { instalments });
    } catch (error) {
        res.redirect('/login');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', { 
        message: 'Terjadi kesalahan! Silakan coba lagi.' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('pages/error', { 
        message: 'Halaman tidak ditemukan!' 
    });
});

export default app;