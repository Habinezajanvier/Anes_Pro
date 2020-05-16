import { Router } from 'express';
import Question from './controller/question';

const router = new Router();

router.post('/add', Question.registerQuestion);
router.get('/all', Question.getQuestion);

export default router;
