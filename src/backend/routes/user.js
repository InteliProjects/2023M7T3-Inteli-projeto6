const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user")
const { body, param, validationResult } = require("express-validator");
const { subscriptionController } = require("../controllers/user");
const { verifyAuthentication } = require("../middlewares/verifyAuth");

Router.post("/subscription",
    [body("nome", "Preencha o campo Nome").exists({ checkFalsy: true })],
    [body("email", "Preencha o campo Email").exists({ checkFalsy: true })],
    [body("pass", "Preencha o campo Senha").exists({ checkFalsy: true })],
    userController.subscriptionController
);

Router.get("/", (req, res) => {
    res.send("Seja bem vindo as rotas de usuário!");
});
    
Router.post("/login",
    [body("email", "Preencha o campo Email").exists({ checkFalsy: true })],
    [body("pass", "Preencha o campo Senha").exists({ checkFalsy: true })],
    userController.loginController
);


module.exports = Router;