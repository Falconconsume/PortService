const {string, object, number} = require('yup')

const userSchema = object().shape({
	username: string().required('You have to enter the username!'),
	password: string().required('You didn`t enter the password')
		.min(6, 'You have to enter at least 6 letters of your password')
		.max(20, 'You can`t enter more than 20 letters'),
})

const userValidation = async (req, res, next) => {
	try {
		await userSchema.validate(req.body)
		return next()
	} catch (err) {
		res.status(400).json({message: err.message})
	}
};

module.exports = {
	userValidation
}