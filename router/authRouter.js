const authRouter = require('express').Router();

const AuthController = require('../controllers/Auth')
const PageRenderController = require('../controllers/pageRender')
const {userValidation} = require("../validation/userValidation");
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


authRouter.route('/login',).post( userValidation, AuthController.login).get( PageRenderController.renderLoginPage)
authRouter.route('/register').post(userValidation, AuthController.register).get(PageRenderController.renderRegisterPage)
authRouter.get('/admin', authMiddleware, roleMiddleware(['admin']), AuthController.getUsers)
authRouter.get(`/delete-user/:userId`, AuthController.deleteUser);
authRouter.get('/logout', AuthController.logout)
module.exports = authRouter