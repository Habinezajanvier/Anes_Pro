import express from 'express';
import dbConnections from './db/connection';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/', (req, res) => {
  res.status(200).send({
    message: 'welcome to where Anesthesia pro share ideas',
  });
});

/**
 * Routes configurations
 */

dbConnections();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `...App is running on http://localhost:${port}...`
  );
});
