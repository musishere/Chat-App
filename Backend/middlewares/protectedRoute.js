import Jwt from 'jsonwebtoken';
import User from '../models/userModels.js';
import dotenv from 'dotenv';

dotenv.config();

const protectedRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ message: 'Token expired. Please login' });
		}

		const decode = Jwt.verify(token, process.env.JwtSecret);

		if (!decode) {
			res.status(401).json({ error: 'unauthorized Token' });
		}

		const user = await User.findById(decode.userid).select('-password');
		if (!user) {
			res.status(401).json({ error: 'User not Found' });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log('error in protected Route middleware', error.message);
		res.status(500).json({ error: 'Interval server err or' });
	}
};

export default protectedRoute;
