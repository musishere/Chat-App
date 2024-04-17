import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateTokenAndCookie = async (userid, res) => {
	const token = Jwt.sign({ userid }, process.env.JwtSecret, { expiresIn: '15d' });

	res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 15 * 24 * 60 * 60 * 1000,
		sameSite: 'strict',
	});
};

export default generateTokenAndCookie;
