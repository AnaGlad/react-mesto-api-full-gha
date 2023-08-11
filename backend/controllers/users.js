const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err'); // 404
const WrongTokenError = require('../errors/wrong-token-err'); // 401
const ExistedEmailError = require('../errors/existed-email-err'); // 409
const BadRequestError = require('../errors/bad-request-err'); // 400

const OK_CODE = 200;
const CREATED_CODE = 201;

function getUserList(req, res, next) {
  return User.find({})
    .then((users) => res.status(OK_CODE).send(users))
    .catch(next);
}

function getUser(req, res, next) {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else {
        next(err);
      }
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_CODE).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistedEmailError('Такой email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`));
      } else {
        next(err);
      }
    });
}

function updateUserProfile(req, res, next) {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`));
      } else {
        next(err);
      }
    });
}

function updateUserAvatar(req, res, next) {
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`));
      } else { next(err); }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new WrongTokenError(err.message));
    });
}

function getUserInfo(req, res, next) {
  return User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch(next);
}

module.exports = {
  getUserList,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getUserInfo,
};
