const { validationResult } = require('express-validator');
require('express-async-errors');

const hookService = require('../services/hooks');

const hooks = new hookService.HookService();

const HooksController = async(req,res) => {
    const { payload } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.errors[0].msg});
    }

    try{
        const hookResponse = await hooks.CreatePayload(payload);
        res.send(hookResponse);
    } catch(error){
        res.status(500).send(error.message);
    }

}

module.exports = {
    HooksController,
}