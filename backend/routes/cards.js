const router = require('express').Router();
const createCardValidation = require('../validation/createCardValidation');
const idCardValidation = require('../validation/idCardValidation');

const {
  getCardList,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getCardList);

router.post('/', createCardValidation, postCard);

router.delete('/:cardId', idCardValidation, deleteCard);

router.put('/:cardId/likes', idCardValidation, putLike);

router.delete('/:cardId/likes', idCardValidation, deleteLike);

module.exports = router;
