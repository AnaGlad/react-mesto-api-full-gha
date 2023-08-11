const { celebrate, Joi } = require('celebrate');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'(*+,;=]*)$/),
    email: Joi.string().required().pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    password: Joi.string().required(),
  }),
});

module.exports = createUserValidation;
