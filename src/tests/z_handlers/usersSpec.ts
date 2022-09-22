import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let userId = 0;
let token = '';

describe('Test users endpoints responses', () => {
  it('it should receive status 200 on user create', async () => {
    const response = await request.post('/users').send({
      username: 'apitestuser',
      first_name: 'Test',
      last_name: 'Usertest',
      password: '123password'
    });

    expect(response.status).toBe(200);
    userId = response.body.id;
    token = response.body.token;
  });

  it('it should receive status 404 on user update without token', async () => {
    const response = await request.put(`/users/${userId}`).send({
      username: 'updateapitestuser',
      first_name: 'Update',
      last_name: 'Usertest',
      password: 'password'
    });

    expect(response.status).toBe(403);
  });

  it('it should receive status 404 on user list without token', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(403);
  });
});
