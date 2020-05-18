import model from '../../models';

const { Question } = model;

export default {
  registerQuestion: async (req, res) => {
    try {
      const question = new Question(req.body);
      const savedQustion = await question.save();
      res.status(200).send(savedQustion);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getQuestion: async (req, res) => {
    try {
      const allQuestion = await Question.find().select({ _id: 0, __v: 0 });
      res.status(200).send(allQuestion);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
