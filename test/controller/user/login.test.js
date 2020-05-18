import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../src/app';
import { url } from '../../../src/models';

describe('Login', () => {
  beforeAll((done) => {
    mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      }
    );
  });
  describe('/login', () => {
    it('Should warn the user if no account found', async (done) => {
      const user = {
        email: 'anyemail@email.com',
        password: 'anyPassword'
      };
      const res = await request(server).post('/anes/user/login').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg', 'Account not found, signup!');
      done();
    });
    it('Should return 400 if either email or password is missing', async (done) => {
      const res = await request(server).post('/anes/user/login').send({ email: 'email@email.com' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      done();
    });
    it('Should return 400 if email is not a valid email', async (done) => {
      const user = {
        email: 'invalidEmail',
        password: 'myPassword'
      };
      const res = await request(server).post('/anes/user/login').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      done();
    });
    it('Should return 200 if login succeeded', async (done) => {
      const newUser = {
        username: 'My username',
        email: 'email@email.com',
        password: 'myPassword',
        firstName: 'firstName',
        secondName: 'secondName'
      };

      await request(server).post('/anes/user/signup').send(newUser);

      const user = {
        email: 'email@email.com',
        password: 'myPassword'
      };
      const res = await request(server).post('/anes/user/login').send(user);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe(user.email);
      done();
    });
    it('Should warn the user if password is incorrect', async (done) => {
      const user = {
        email: 'email@email.com',
        password: 'anyPassword'
      };
      const res = await request(server).post('/anes/user/login').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg', 'email or password not correct');
      done();
    });
  });
});
