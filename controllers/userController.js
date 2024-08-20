import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import userRepository from '../repositories/userRepository.js';
import asyncHandler from "express-async-handler";
const JWT_SECRET =  'mayorgnn@088';



// export const create =  asyncHandler(async (req, res) => {
//   try {
//     const existingAccount = await AccountRepository.findByEmail(req.body.email);
//     if (existingAccount) {
//        res.status(400).send({ message: 'Account already exists' });
//        throw new Error('Account not Found!!!')
//     };

//     const hashedPassword = await bcrypt.hash(req.body.password, 8);
//     const account = await AccountRepository.create({ ...req.body, password: hashedPassword });
//     res.status(201).send(account);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }

// });


// create account 
export const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  try {
    //check if there is an existing email 
    const existingUser = await userRepository.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'email already exists' });
    }

   const newUser = {
    email:req.body.email,
    password:hashedPassword,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    dateOfBirth:req.body.dateOfBirth, //year-month-say, 1992-03-24
    accountNo:req.body.accountNo,
    BVN:req.body.BVN, 
    NIN:req.body.NIN, 
    Address:req.body.Address,
    StateOfOrigin:req.body.StateOfOrigin,
    occupation:req.body.occupation
   }

  
      const user = await userRepository.create(newUser);
      //await WelcomeEmail(newUser.email, newUser.fullName)
      res.status(201).send({ user, message:"user created successfully" });
   

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}




// export const createAdmin = async (data, res) => {
//   console.log("data here",data)
//   try {
    
//     const hashedPassword = await bcrypt.hash(data.password, 8);
//     const user = await userRepository.create({ ...data, password: hashedPassword });
//     if(user){
//       console.log("created Admin")
//     //await SendLoginDetailsToSchoolAdmin(data.email, data.fullName, data.password)

//       return true
//     }else{
//       return false
//     }
  
//     // res.status(201).send(user);
//   } catch (err) {
//     return false
//     //console.log("there was and error here", err)
//     // res.status(500).send({ message: err.message });
//   }
// };

// export const findAll = async (req, res) => {
//   try {
//     const users = await userRepository.findAll();
//     res.status(200).send(users);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// export const findOne = async (req, res) => {
//   try {
//     const user = await userRepository.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// export const update = async (req, res) => {
//   try {
//     const user = await userRepository.update(req.params.id, req.body);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await userRepository.delete(req.params.id);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(200).send({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

   
//     const Account = await AccountRepository.findOne({ EmailAddress: email });

//     if (!Account) {
//       return res.status(404).send({ message: 'account not found' });
//     }
//     const isPasswordValid = await bcrypt.compare(password, Account.password);
//     if (!isPasswordValid) {
//       return res.status(401).send({ message: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: Account.id }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).send( { message: 'login successfully', token });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await AccountRepository.findById(req.AccountId);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };


// export const forgotPassword  = async (req, res) => {
//   try {
//     const { email } = req.body;  
//     const host = req.headers.host; // localhost:5000 
//     const user = await userRepository.findByEmail(email); 
//     if (!user) {
//       return res.status(404).send(`User ${user} not found`) 

//     } 
//     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' }); 
//     user.resetPasswordToken = token; 
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour 
//     await user.save();
//     // return res.json(user); 
//     //send password token to the email 
//     await ResetPasswordEmail(user.email, user.fullName, user.resetPasswordToken, host)
//   } catch (error) {
    
//   }
  
// }; 

// export const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//       // Verify the token
//       let decoded;
//       try {
//           decoded = jwt.verify(token, 'mayorgnn@088');
//       } catch (err) {
//           return res.status(401).json({ error: 'Incorrect token or it has expired!' });
//       }

//       // Find the user by token and ensure the token hasn't expired
//       const user = await User.findOne({
//           resetPasswordToken: token,
//           resetPasswordExpires: { $gt: Date.now() },
//       });

//       if (!user) {
//           return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
//       }

//       // Hash the new password and update the user's password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//       user.resetPasswordToken = undefined; // Clear the reset token
//       user.resetPasswordExpires = undefined; // Clear the token expiration

//       await user.save(); // Save the updated user

//       res.status(200).json({ message: 'Password has been reset successfully.' });
//   } catch (err) {
//       console.error('Server error:', err);
//       res.status(500).json({ error: 'Server error.' });
//   }
// };
