import {isEscapeKey} from './util.js';
import {closeImageUploadModal} from './upload.js';

const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

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
  return isEmptyString(value) || value.split(' ').every((hashtag) => HASHTAG_REGEX.test(hashtag));
}

function checkSharp (value) {
  return value.split(' ').every((hashtag) => {
    if (hashtag === '#') {
      return false;
    }

    return true;
  });
}

function validateHashtagsLength (value) {
  return value.split(' ').every((hashtag) => {
    if (hashtag.length <= HASHTAG_MAX_LENGTH) {
      return true;
    }

    return false;
  });
}

function validateHashtagsAmount (value) {
  return value.split(' ').length <= HASHTAGS_MAX_AMOUNT;
}

function validateHashtagsUniq (value) {
  const hashtagsArray = value.split(' ').map((element) => element.toLowerCase());

  return hashtagsArray.every((element, index) => hashtagsArray.indexOf(element) === index);
}

function validateCommentsLength (value) {
  return value.length < COMMENT_MAX_LENGTH;
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

pristine.addValidator(hashtagsElement, validateHashtagsLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', 6);

pristine.addValidator(commentElement, validateCommentsLength, 'Длина комментария не может составлять больше 140 символов');

hashtagsElement.addEventListener('keydown', inputKeydownHandler);

commentElement.addEventListener('keydown', inputKeydownHandler);

let popupMessageClass = '';

function closePopupMessage() {
  const popupElement = document.querySelector(`.${popupMessageClass}`);
  document.removeEventListener('click', clickOutsideMessagePopupHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  popupElement.remove();
}

function clickOutsideMessagePopupHandler(evt) {
  if (evt.target.matches(`.${popupMessageClass}__button`) || !evt.target.closest(`.${popupMessageClass}__inner`)) {
    closePopupMessage();
  }
}

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closePopupMessage();
  }
}

function showMessage () {

  const errorElementTemplate = document.querySelector(`#${popupMessageClass}`).content.querySelector(`.${popupMessageClass}`);
  const errorElement = errorElementTemplate.cloneNode(true);
  document.body.appendChild(errorElement);


  const errorButtonElement = document.querySelector(`.${popupMessageClass}__button`);
  document.addEventListener('click', clickOutsideMessagePopupHandler);
  document.addEventListener('keydown', documentKeydownHandler);

  errorButtonElement.addEventListener('click', () => {
    document.removeEventListener('click', closePopupMessage);
    closePopupMessage();
  });
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setUploadFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);

      fetch('https://25.javascript.pages.academy/kekstagram',{
        method: 'POST',
        body: formData,
      },
      )
        .then((response) => {
          popupMessageClass = response.ok ? 'success' : 'error';
        })
        .catch(() => {
          popupMessageClass = 'error';
        })
        .finally(() => {
          closeImageUploadModal();
          showMessage();
          unblockSubmitButton();
        });

    }
  });
};

export {setUploadFormSubmit};
