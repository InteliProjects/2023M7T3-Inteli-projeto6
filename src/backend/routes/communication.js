const express = require("express");
const Router = express.Router();
const communicationController = require("../controllers/communication")
const { receiverController } = require('../controllers/communication')
const { body, param, validationResult } = require("express-validator");
const { verifyAuthentication } = require("../middlewares/verifyAuth");

Router.post("/transcript",
    // [body("transcript", "O texto não está disponível").exists({ checkFalsy: true })],
    communicationController.receiverController.transcript,
);

Router.post("/sendNLP",
    communicationController.receiverController.nlpSend,
);

Router.post("/receiveNLP",
    communicationController.receiverController.nlpReceive,
);

Router.get("/", (req, res) => {
    res.send("Seja bem vindo as rotas de comunicação entre as APIs!");
});
    



module.exports = Router;