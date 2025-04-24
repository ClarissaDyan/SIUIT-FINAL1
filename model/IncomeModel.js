import mongoose from 'mongoose'; //import mongoose (library utnuk bekerja dengan database MongoDB)

//membuat skema untuk menyimpan data income, yaitu jumlah pendapatan (amount), tanggal (date), sumber pendapatan (description), category
const incomeSchema = new mongoose.Schema({
    amount: { type: Number, required: true}, 
    date: { type: Date, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    
    //account adalah ID dari user yang memiliki data ini
    //tipe datanya adalah ObjectId yang terhubung ke koleksi 'Account' (relasi ke tabel akun)
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
});

//membuat model 'Income' dari schema yang sudah dibuat, supaya bisa dipakai untuk menyimpan data ke MongoDB
export default mongoose.model('Income', incomeSchema);