const express = require("express");
const Router = express.Router();
const webhookcontroller = require("../controllers/webhook")
const { webhookController } = require('../controllers/webhook')
const { body, param, validationResult } = require("express-validator");
const { verifyAuthentication } = require("../../backend/middlewares/verifyAuth");

Router.post("/webhook",
    [body("data", "Preencha o campo data").custom((value, {req}) =>{
        req.body.data = req.body;
        return true;
    })
    ],
    webhookcontroller.webhookController,
);

module.exports = Router;