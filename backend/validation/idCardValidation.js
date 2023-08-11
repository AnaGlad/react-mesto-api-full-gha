const { celebrate, Joi } = require('celebrate');

const idCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = idCardValidation;
