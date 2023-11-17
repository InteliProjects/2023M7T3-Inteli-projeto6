const { validationResult } = require('express-validator');
require('express-async-errors');

const webhookService = require('../services/webhook');
const webhook = new webhookService.webhookService();

const webhookController = async (req, res) =>{
    const {data} = req.body;
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.errors[0].msg});
    }

    try{
        const webhookReponse = await webhook.Receiver(data);
        res.send(webhookReponse);
    } catch (error){
        res.status(500).send(error.message);
    }
}

module.exports = {
    webhookController,
}