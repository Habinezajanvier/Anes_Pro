import express from 'express';
import morgan from 'morgan';
import dbConnections from './db/connection';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('*', (req, res) => {
  res.status(200).send({
    message: 'welcome to where Anesthesia pro share ideas'
  });
});

/**
 * Routes configurations
 */

dbConnections();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`...App is running on http://localhost:${port}/  ...`);
});
