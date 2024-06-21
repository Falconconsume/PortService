const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Roles = require('../models/Roles');

function generateAccessToken(id, roles) {
	const payload = { id, roles };
	return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '24h' });
}

class AuthController {
	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(404).json({ message: 'User wasn’t found!' });
			}
			const candidate = await bcrypt.compare(password, user.password);
			if (candidate) {
				const token = generateAccessToken(user._id, user.role);
				return res.json({ token });
			} else {
				return res.status(404).json({ message: 'You entered an invalid password' });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Login error' });
		}
	}

	async register(req, res) {
		try {
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) {
				return res.status(400).json({ message: 'User with this username already exists' });
			}
			const hashedPassword = bcrypt.hashSync(password, 7);
			const role = await Roles.findOne({ value: 'user' });
			const user = await User.create({
				username,
				password: hashedPassword,
				role: [role.value],
			});
			res.json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Register error' });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Get users error' });
		}
	}

	async logout(req, res) {
		req.user = null;
		res.redirect('index');
	}
}

module.exports = new AuthController();
