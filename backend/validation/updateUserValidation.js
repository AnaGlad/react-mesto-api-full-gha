const { celebrate, Joi } = require('celebrate');

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'(*+,;=]*)$/),
  }),
});

module.exports = updateUserValidation;
