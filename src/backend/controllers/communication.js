const { validationResult } = require('express-validator');
require('express-async-errors');

const communicationService = require('../services/communication');
const communication = new communicationService.communicationService();

const receiverController = {
    transcript: async (req,res) => {
        const {transcript} = req.body;
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({error: errors.errors[0].msg});
        }
    
        try{
            const receiveResponse = await communication.transcript(transcript);
            const queueResponse = await communication.sendTranscriptionToQueue(transcript);
            res.send(receiveResponse);
            console.log(queueResponse);
        } catch (error){
            res.status(500).send(error.message);
        }
    },
    nlpSend: async (req, res) => {
        const {data, userId, messageId} = req.body;
        const errors = validationResult(req);
        console.log(req.body)
    
        if (!errors.isEmpty()) {
            return res.status(400).json({error: errors.errors[0].msg});
        }
    
        try{
            const response = await communication.nlpSend(data, userId, messageId);
            if(response){
                res.send({response});
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    },
    nlpReceive: async (req, res) => {
        const {data, userId, messageId} = req.body;
        const errors = validationResult(req);
        console.log(req.body)
    
        if (!errors.isEmpty()) {
            return res.status(400).json({error: errors.errors[0].msg});
        }
    
        try{
            const response = await communication.nlpReceive(data, userId, messageId);
            if(response){
                res.send(response);
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    }
}

module.exports = {
    receiverController,
}