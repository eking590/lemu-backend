import jwt from 'jsonwebtoken'; 
const JWT_SECRET = process.env.JWT_SECRET || 'mayorgnn@088';

export const ValidateToken = async (req, res, next) => {
    
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
   //console.log("check two",token)
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET,);
    // console.log("here",decoded.id)
    req.AccountId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};
