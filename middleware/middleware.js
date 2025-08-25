import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
try {
const authHeader = req.headers.authorization || '';
const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
if (!token) return res.status(401).json({ message: 'No token, authorization denied' });


const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
if (!req.user) return res.status(401).json({ message: 'User not found' });
next();
} catch (err) {
return res.status(401).json({ message: 'Token invalid or expired' });
}
};