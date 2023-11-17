const express = require("express");
const Router = express.Router();
const hookController = require('../controllers/hooks')
const { body, param, validationResult } = require("express-validator");
const { HooksController } = require('../controllers/hooks');
const { verifyAuthentication } = require("../middlewares/verifyAuth");

Router.post("/webhook",
    [body("payload", "Preencha o campo payload").exists({ checkFalsy: true })],
    hookController.HooksController,
    verifyAuthentication
);

module.exports = Router;