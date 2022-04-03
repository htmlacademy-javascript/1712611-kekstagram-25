// import {closeImageUploadModal} from './upload.js';
import {isEscapeKey} from './util.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');

const hashtagsMaxAmount = 5;
const commentMaxLength = 140;

const re = /^#[A-Za-zА-Яа-яЁё0-9]/;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'text__wrapper',
  errorTextParent: 'text__wrapper',
  errorTextClass: 'text__error-text'
}, false);

function isEmptyString(value) {
  return !value.length;
}

function checkFirstSymbol (value) {
  return isEmptyString(value) || value.split(' ').every((hashtag) => {
    if (hashtag[0] === '#') {
      return true;
    }

    return false;
  });
}

function validateHashtagsSymbols (value) {
  return isEmptyString(value) || value.split(' ').every((hashtag) => re.test(hashtag));
}

function checkSharp (value) {
  return value.split(' ').every((hashtag) => {
    if (hashtag === '#') {
      return false;
    }

    return true;
  });
}

function validateHashtagsAmount (value) {
  return value.split(' ').length <= hashtagsMaxAmount;
}

function validateHashtagsUniq (value) {
  const hashtagsArray = value.split(' ').map((element) => element.toLowerCase());

  return hashtagsArray.every((element, index) => hashtagsArray.indexOf(element) === index);
}

function validateCommentsLength (value) {
  return value.length < commentMaxLength;
}

function inputKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

pristine.addValidator(hashtagsElement, checkFirstSymbol, 'Хэш-тег должен начинаться с символа #', 10);

pristine.addValidator(hashtagsElement, validateHashtagsAmount, 'Нельзя указать больше пяти хэш-тегов', 6);

pristine.addValidator(hashtagsElement, validateHashtagsSymbols, 'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 8);

pristine.addValidator(hashtagsElement, checkSharp, 'Хеш-тег не может состоять только из одной решётки', 9);

pristine.addValidator(hashtagsElement, validateHashtagsUniq, 'Один и тот же хэш-тег не может быть использован дважды', 7);

pristine.addValidator(commentElement, validateCommentsLength, 'Длина комментария не может составлять больше 140 символов');

hashtagsElement.addEventListener('keydown', inputKeydownHandler);

commentElement.addEventListener('keydown', inputKeydownHandler);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // closeImageUploadModal(evt);
  // const successElement = document.querySelector('#success').content.querySelector('.success');
  // const errorElement = document.querySelector('#error').content.querySelector('.error');

  const isHashtagValid = pristine.validate(hashtagsElement);
  const isCommentValied = pristine.validate(commentElement);
  const isValid = isHashtagValid && isCommentValied;
  if (isValid) {
    // document.body.appendChild(successElement);
  } else {
    // document.body.appendChild(errorElement);
  }
});
