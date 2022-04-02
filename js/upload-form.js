// import {closeImageUploadModal} from './upload.js';
import {isEscapeKey} from './util.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');

const hashtagPristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'text__hashtags-wrapper',
  errorTextClass: 'img-upload__error-text'
}, false);

const commentPristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'text__comment-wrapper',
  errorTextClass: 'img-upload__error-text'
}, false);

function checkFirstSymbol (value) {
  return value.split(' ').every((hashtag) => {
    if (hashtag[0] === '#') {
      return true;
    }

    return false;
  });
}

function validateHashtagsSymbols (value) {
  return value.split(' ').every((hashtag) => {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]/;
    return re.test(hashtag);
  });
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
  return value.split(' ').length <= 5;
}

function validateHashtagsUniq (value) {
  const hashtagsArray = value.split(' ').map((element) => element.toLowerCase());

  return hashtagsArray.every((element, index) => hashtagsArray.indexOf(element) === index);
}

function validateCommentsLength (value) {
  return value.length < 140;
}

function inputKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

hashtagPristine.addValidator(hashtagsElement, checkFirstSymbol, 'Хэш-тег должен начинаться с символа #', 10);

hashtagPristine.addValidator(hashtagsElement, validateHashtagsAmount, 'Нельзя указать больше пяти хэш-тегов', 6);

hashtagPristine.addValidator(hashtagsElement, validateHashtagsSymbols, 'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 8);

hashtagPristine.addValidator(hashtagsElement, checkSharp, 'Хеш-тег не может состоять только из одной решётки', 9);

hashtagPristine.addValidator(hashtagsElement, validateHashtagsUniq, 'Один и тот же хэш-тег не может быть использован дважды', 7);

commentPristine.addValidator(commentElement, validateCommentsLength, 'Длина комментария не может составлять больше 140 символов');

hashtagsElement.addEventListener('keydown', inputKeydownHandler);

commentElement.addEventListener('keydown', inputKeydownHandler);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // closeImageUploadModal(evt);
  // const successElement = document.querySelector('#success').content.querySelector('.success');
  // const errorElement = document.querySelector('#error').content.querySelector('.error');

  const isValid = hashtagPristine.validate(hashtagsElement) && commentPristine.validate(commentElement);
  if (isValid) {
    // document.body.appendChild(successElement);
  } else {
    // document.body.appendChild(errorElement);
  }
});
