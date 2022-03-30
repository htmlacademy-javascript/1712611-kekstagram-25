import {closeImageUploadModal} from './upload.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsStringElement = uploadFormElement.querySelector('.text__hashtags');

const pristine = new Pristine(uploadFormElement);

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;

function validateHashtags (value) {
  value.split(' ').every((hashtag) => {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    return re.test(hashtag);
  });
}

// нельзя указать больше пяти хэш-тегов;

function validateHashtagsAmount (value) {
  return value.split(' ').length <= 5;
}

// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// один и тот же хэш-тег не может быть использован дважды;

pristine.addValidator(hashtagsStringElement, validateHashtagsAmount);

pristine.addValidator(hashtagsStringElement, validateHashtags);

uploadFormElement.addEventListener('submit', (evt) => {
  closeImageUploadModal(evt);
  const successElement = document.querySelector('#success').content.querySelector('.success');
  const errorElement = document.querySelector('#error').content.querySelector('.error');

  const isValid = pristine.validate();
  if (isValid) {
    document.body.appendChild(successElement);
  } else {
    document.body.appendChild(errorElement);
  }
});
