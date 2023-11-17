const webtoken = require('jsonwebtoken');
const uuid = require('uuid').v4;
require('dotenv').config();

class webhookService{
    async Receiver(data){
        return{
            id: uuid(),
            data: data
        };
    };
};

module.exports = {
    webhookService,
}