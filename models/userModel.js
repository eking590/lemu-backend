import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  dateOfBirth: Date,
  accountNo: String,
  BVN: String,
  NIN: String, 
  Address: String, 
  StateOfOrigin: String, 
  occupation: String, 
  

}, {
  timestamps: true,
});

const user = mongoose.model('User', userSchema);

export default user;

