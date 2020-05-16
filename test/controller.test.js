import request from 'supertest';
import mongoose from 'mongoose';
import server from '../src/index';
import { url } from '../src/models';

describe('/anesPro', () => {
  beforeAll((done) => {
    mongoose.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });
  });

  describe('GET', () => {
    it('should get all questions in the db', async (done) => {
      const res = await request(server).get('/anes/all');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      done();
    });
  });

  describe('POST', () => {
    it('should insert a question in db', async (done) => {
      const question = {
        title: 'any nerve you know',
        answer: 'sura Nerve'
      };
      const res = await request(server).post('/anes/add').send(question);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(question.name);
      done();
    });
  });
});
