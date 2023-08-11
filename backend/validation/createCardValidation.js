const { celebrate, Joi } = require('celebrate');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'(*+,;=]*)$/),
    owner: Joi.string(),
    likes: Joi.string(),
  }),
});

module.exports = createCardValidation;
