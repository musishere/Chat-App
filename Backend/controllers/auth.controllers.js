import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import generateTokenAndCookie from '../Utilis/generrateToken.js';

export const signUp = async (req, res, next) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: 'Username already exists' });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			await generateTokenAndCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: 'invalid user Data' });
		}
	} catch (error) {
		console.log('Error in signUp', error.message);
		res.status(500).json({ error: 'Internal Server Error.' });
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'username or password is required' });
		}

		const user = await User.findOne({ username });
		const isPasswordvalid = await bcrypt.compare(password, user?.password || '');

		if (!user || !isPasswordvalid) {
			return res
				.status(400)
				.json({ error: 'Invald password or user does not exist. Signup!' });
		}

		generateTokenAndCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log('error in Login', error.message);
		res.status(500).json({ error: 'Interval Sever Error' });
	}
};

export const logOut = async (req, res, next) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Log out successfully' });
	} catch (error) {
		console.log('error in LogOut', error.message);
		res.status(500).json({ error: 'Interval Sever Error' });
	}
};
