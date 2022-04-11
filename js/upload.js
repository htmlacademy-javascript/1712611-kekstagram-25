import {isEscapeKey} from './util.js';
import './upload-form.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

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

function uploadPreviewChangeScale (value) {
  imageUploadPreviewElement.style = `transform: scale(${value / 100})`;
  scaleValueELement.value = `${value}%`;
}

function getCurrentScaleValue() {
  return Number(scaleValueELement.value.replace('%',''));
}

function openImageUploadModal () {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  const scaleCurrentValue = getCurrentScaleValue();
  uploadPreviewChangeScale(scaleCurrentValue);
}

function closeImageUploadModal(evt) {
  evt.preventDefault();
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadFormElement.reset(); //обнуляет поля формы
  imageUploadPreviewElement.className = ''; //наложение фильтра: по умолчаню "Оригинал"
}

function zoomOutImage(evt) {
  evt.preventDefault();
  let scaleCurrentValue = getCurrentScaleValue();
  scaleCurrentValue = scaleCurrentValue - SCALE_STEP;
  if (scaleCurrentValue < MIN_SCALE_VALUE) {
    scaleCurrentValue = MIN_SCALE_VALUE;
  }
  uploadPreviewChangeScale(scaleCurrentValue);
}

function zoomInImage(evt) {
  evt.preventDefault();
  let scaleCurrentValue = getCurrentScaleValue();
  scaleCurrentValue = scaleCurrentValue + SCALE_STEP;
  if (scaleCurrentValue > MAX_SCALE_VALUE) {
    scaleCurrentValue = MAX_SCALE_VALUE;
  }
  uploadPreviewChangeScale(scaleCurrentValue);
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
