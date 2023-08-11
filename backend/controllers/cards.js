const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequestError = require('../errors/bad-request-err'); // 400
const ForbiddenActionError = require('../errors/forbidden-action'); // 403

const OK_CODE = 200;
const CREATED_CODE = 201;

function getCardList(req, res, next) {
  return Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch(next);
}

function postCard(req, res, next) {
  return Card.create({ ...req.body, owner: req.user })
    .then((card) => {
      res.status(CREATED_CODE).send(card);
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

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }

      if (req.user._id.toString() !== card.owner.toString()) {
        throw new ForbiddenActionError('Нет прав для совершения этого действия');
      }
      Card.findByIdAndDelete(cardId).then();
      return res.status(OK_CODE).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else { next(err); }
    });
}

function putLike(req, res, next) {
  console.log(req.user._id);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else {
        next(err);
      }
    });
}

function deleteLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getCardList,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
