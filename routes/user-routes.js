const express = require('express')
const userController = require("../controllers/user-controller")

const userRouter = express.Router()

userRouter.get('/', userController.getAllUser)
userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)

module.exports = userRouter