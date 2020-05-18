import Joi from '@hapi/joi';

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(8).required(),
    firstName: Joi.string().min(5).required(),
    secondName: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(10).max(250).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
