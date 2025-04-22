import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
});

export default mongoose.model('Invoice', invoiceSchema);