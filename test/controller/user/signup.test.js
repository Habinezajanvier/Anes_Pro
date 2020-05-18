import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../src/app';
import { url } from '../../../src/models';

describe('email signup', () => {
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
  describe('/signup', () => {
    it('should return 400 if property is missing', async (done) => {
      const user = {
        username: 'My username',
        email: 'emai@email.com',
        firstName: 'firstName',
        secondName: 'secondName'
      };

      const res = await request(server).post('/anes/user/signup').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      done();
    });
    it('should return 400 if email is not valid email', async (done) => {
      const user = {
        username: 'My username',
        password: 'passwordssss',
        email: 'invalidEmail',
        firstName: 'firstName',
        secondName: 'secondName'
      };

      const res = await request(server).post('/anes/user/signup').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      done();
    });
    it('Should return 400 if password length is below 10', async (done) => {
      const user = {
        username: 'My username',
        email: 'email@email.com',
        password: 'password',
        firstName: 'firstName',
        secondName: 'secondName'
      };
      const res = await request(server).post('/anes/user/signup').send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      done();
    });
    it('Should create account for a new user', async (done) => {
      const user = {
        username: 'My username',
        email: 'email@email.com',
        password: 'passwordsss',
        firstName: 'firstName',
        secondName: 'secondName'
      };
      const res = await request(server).post('/anes/user/signup').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('savedUser');
      done();
    });
    it('Should warn the user if the account exist', async (done) => {
      const user = {
        username: 'My username',
        email: 'email@email.com',
        password: 'passwordsss',
        firstName: 'firstName',
        secondName: 'secondName'
      };
      const res = await request(server).post('/anes/user/signup').send(user);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('msg', 'Account exist, login instead');
      done();
    });
  });
});
