const request = require('supertest')
const app = require('../app')

describe('Integration Test - User Login', () => {
    let authToken = '';

  beforeEach(async () => {
    const response = await request(app)
      .post('/v1/user/login')
      .send({
        email: 'alexandre.souza@sou.inteli.edu.br',
        senha: 'Outaccount123',
      });

    authToken = response.body.access_token;
  });

  it('Deve retornar um token de autenticação válido', async () => {
    expect(authToken).toBeDefined();
  });

  it('Deve proteger uma rota autenticada', async () => {
    const response = await request(app)
      .get('/v1/hook/webhook')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Rota protegida acessada com sucesso!');
  });

  it('Deve retornar erro ao acessar rota protegida sem autenticação', async () => {
    const response = await request(app).get('/v1/hook/webhook');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Autenticação necessária');
  });
});