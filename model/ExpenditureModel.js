import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
});

export default mongoose.model('Expenditure', expenditureSchema);