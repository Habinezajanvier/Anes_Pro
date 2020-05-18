import express from 'express';
import morgan from 'morgan';
import router from './routes/router';
import userRouter from './routes/user/email';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

/**
 * Routes configurations
 */
app.use('/anes', router);
app.use('/anes/user/', userRouter);
app.use('*', (req, res) => {
  res.status(200).send({
    message: 'welcome to where Anesthesia pro share ideas'
  });
});

export default app;
