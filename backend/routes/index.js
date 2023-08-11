const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
