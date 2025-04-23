import mongoose from "mongoose";

const instalmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  tenor: { type: Number, required: true },
  date: { type: Number, required: true }, 
  paidCount: { type: Number, default: 0 },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
});

export default mongoose.model('Instalment', instalmentSchema);