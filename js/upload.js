import {isEscapeKey} from './util.js';
import './upload-form.js';

const imageUploadModalElement = document.querySelector('.img-upload__overlay');
const imageUploadElement = document.querySelector('#upload-file');
const imageUploadModalCloseElement = imageUploadModalElement.querySelector('.img-upload__cancel');
const imageUploadPreviewElement = imageUploadModalElement.querySelector('.img-upload__preview img');
const uploadFormElement = document.querySelector('.img-upload__form');
const buttonScaleSmallerElement = document.querySelector('.scale__control--smaller');
const buttonScaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueELement = document.querySelector('.scale__control--value');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeImageUploadModal(evt);
  }
}

function openImageUploadModal () {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  const scaleCurrentValue = Number(scaleValueELement.value.replace('%',''));
  imageUploadPreviewElement.style = `transform: scale(${scaleCurrentValue / 100})`;
}

function closeImageUploadModal(evt) {
  evt.preventDefault();
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadFormElement.reset(); //обнуляет поля формы
}

function zoomOutImage(evt) {
  evt.preventDefault();
  let scaleCurrentValue = Number(scaleValueELement.value.replace('%',''));
  scaleCurrentValue = scaleCurrentValue - 25;
  if (scaleCurrentValue < 25) {
    scaleCurrentValue = 25;
  }
  imageUploadPreviewElement.style = `transform: scale(${scaleCurrentValue / 100})`;
  scaleValueELement.value = `${scaleCurrentValue}%`;
}

function zoomInImage(evt) {
  evt.preventDefault();
  let scaleCurrentValue = Number(scaleValueELement.value.replace('%',''));
  scaleCurrentValue = scaleCurrentValue + 25;
  if (scaleCurrentValue > 100) {
    scaleCurrentValue = 100;
  }
  imageUploadPreviewElement.style = `transform: scale(${scaleCurrentValue / 100})`;
  scaleValueELement.value = `${scaleCurrentValue}%`;
}

imageUploadElement.addEventListener('change', () => {
  openImageUploadModal();
});

imageUploadModalCloseElement.addEventListener('click', (evt) => {
  closeImageUploadModal(evt);
});

buttonScaleSmallerElement.addEventListener('click', (evt) => {
  zoomOutImage(evt);
});

buttonScaleBiggerElement.addEventListener('click', (evt) => {
  zoomInImage(evt);
});

export {closeImageUploadModal};
