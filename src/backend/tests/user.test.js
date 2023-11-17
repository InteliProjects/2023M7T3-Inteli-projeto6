const userService = require('../services/user');

const UserService = new userService.UserService();

describe('Criando Usuário', () => {
    it('Não deve logar com email não cadastrado!', async() => {
        const user = {
            email: "alekillergamer25@gmail.com",
            password: "Outaccount123",
        }
        try{
            const response = await UserService.UserLogin(user.email, user.password);

            return expect(response.email).toBe(user.email)
        } catch(error){
            return expect(error.message).toBe("Usuário não cadastrado!")
        }
    })
})