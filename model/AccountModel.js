import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
});


export default mongoose.model('Account', accountSchema);
