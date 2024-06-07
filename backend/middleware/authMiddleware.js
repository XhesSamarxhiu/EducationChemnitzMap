// authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    console.log('User object:', user); // Add this line
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export default authMiddleware;