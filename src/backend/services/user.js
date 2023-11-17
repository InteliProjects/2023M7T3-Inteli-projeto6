const webtoken = require('jsonwebtoken');
const uuid = require('uuid').v4;
const crypt = require('bcryptjs');
const log4js = require('log4js');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URI);

const usersLogger = log4js.getLogger('users');

const { PrismaClient } = require('@prisma/client');
const Client = new PrismaClient();

class UserService {
    constructor(){
        client.connect();
    }

    async CreateUser(nome, email, pass) {
        const verifyUser = await Client.user.findUnique({
            where : {
                email: email
            }
        })
        if(verifyUser) {
            usersLogger.warn(`Usuário ${verifyUser.id} já existente!`)
            throw new Error('Email em uso');
        }
        if(pass) {
            const cryptPass = await crypt.hash(pass, 8);

            pass = cryptPass;
        }
        try{
            const userCreate = await Client.user.create({
                data: {id:uuid(), name: nome, email: email, password: pass}
            });
            usersLogger.info(`Usuário ${userCreate.id} created successfully`)
            const logsCollection = client.db('projeto6_logs').collection('logs_central');
            logsCollection.insertOne({
                timestamp: new Date(),
                level: 'INFO',
                message: `Usuário ${userCreate.id} created successfully!`
            })
            return userCreate
        } catch (error) {
            usersLogger.error(`Problemas no processamento do servidor`);
            const logsCollection = client.db('projeto6_logs').collection('logs_central');
            logsCollection.insertOne({
                timestamp: new Date(),
                level: 'WARN',
                message: `Problemas no processamento do servidor: ${error}`
            })
            throw new Error("Erro criando o usuário")
        }
        
        return userCreate;
    }

    async UserLogin(email, pass) {
        try{
            const userExist = await Client.user.findUnique({
                where: {email: email}
            })

            if(!userExist) {
                throw new Error("Usuário não cadastrado!")
            }
            const passVerify = await crypt.compare(pass, userExist.password);

            if(!passVerify) {
                throw new Error('Credenciais inválidas!')
            }

            const accessToken = webtoken.sign({id: userExist.id}, process.env.TOKEN_USER_AUTH, {expiresIn: '45m'})

            const refreshToken = webtoken.sign({id: userExist.id}, process.env.TOKEN_USER_REFRESH, {expiresIn: '7m'})

            const logsCollection = client.db('projeto6_logs').collection('logs_central');
                logsCollection.insertOne({
                    timestamp: new Date(),
                    level: 'INFO',
                    message: `Usuário ${userExist.id} logged in successfully`
                });

            return{
                message: "Usuário autenticado!",
                access_token: accessToken,
                refresh_token: refreshToken,
                id: userExist.id
            }
        } catch(error){
            const logsCollection = client.db('projeto6_logs').collection('logs_central');
            logsCollection.insertOne({
                timestamp: new Date(),
                level: 'ERROR',
                message: `Erro durante o login: ${error}`
            });
            throw error;
        }
    }
}

module.exports = {
    UserService,
}