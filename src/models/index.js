import mongoose from 'mongoose';
import config from '../../config/config';
import Question from './question';
import User from './user';

const {
  db: {
    username, password, host, port, name
  }
} = config;

export const url =
  config.db.database_url ||
  `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
});

export default { Question, User };
