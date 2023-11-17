const { validationResult } = require('express-validator');
require('express-async-errors');

const userService = require('../services/user');
const user = new userService.UserService();

const subscriptionController = async (req, res) => {
    const {nome, email, pass} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.errors[0].msg});
    }

    try {
        const createResponse = await user.CreateUser(nome, email, pass);
        res.send(createResponse);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const loginController = async (req,res) => {
    const { email, pass } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.errors[0].msg});
    }

    try {
        const loginResponse = await user.UserLogin(email, pass);
        res.send(loginResponse);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    subscriptionController,
    loginController
}