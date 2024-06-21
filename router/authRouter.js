const authRouter = require('express').Router();

const AuthController = require('../controllers/Auth')
const PageRenderController = require('../controllers/pageRender')
const {userValidation} = require("../validation/userValidation");
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


authRouter.post('/login', userValidation, AuthController.login).get('/login', PageRenderController.renderLoginPage)
authRouter.post('/register', userValidation, AuthController.register).get('/register', PageRenderController.renderRegisterPage)
authRouter.get('/users', authMiddleware, roleMiddleware(['admin']), AuthController.getUsers)
authRouter.get('/logout', AuthController.logout)
module.exports = authRouter