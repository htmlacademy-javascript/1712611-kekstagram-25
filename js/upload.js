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
const scaleValueElement = document.querySelector('.scale__control--value');
const sliderElement = document.querySelector('.effect-level__slider');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeImageUploadModal();
  }
}

function uploadPreviewChangeScale (value) {
  imageUploadPreviewElement.style = `transform: scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
}

function getCurrentScaleValue() {
  return Number(scaleValueElement.value.replace('%',''));
}

function openImageUploadModalHandler() {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  sliderElement.classList.add('hidden');
  const scaleCurrentValue = MAX_SCALE_VALUE;
  uploadPreviewChangeScale(scaleCurrentValue);
}

function closeImageUploadModal() {
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadFormElement.reset(); //обнуляет поля формы
  imageUploadPreviewElement.className = '';
  imageUploadPreviewElement.style = '';
}

function closeImageUploadModalHandler() {
  closeImageUploadModal();
}

function zoomOutImageHandler(evt) {
  evt.preventDefault();
  let scaleCurrentValue = getCurrentScaleValue();
  scaleCurrentValue = scaleCurrentValue - SCALE_STEP;
  if (scaleCurrentValue < MIN_SCALE_VALUE) {
    scaleCurrentValue = MIN_SCALE_VALUE;
  }
  uploadPreviewChangeScale(scaleCurrentValue);
}

function zoomInImageHandler(evt) {
  evt.preventDefault();
  let scaleCurrentValue = getCurrentScaleValue();
  scaleCurrentValue = scaleCurrentValue + SCALE_STEP;
  if (scaleCurrentValue > MAX_SCALE_VALUE) {
    scaleCurrentValue = MAX_SCALE_VALUE;
  }
  uploadPreviewChangeScale(scaleCurrentValue);
}

imageUploadElement.addEventListener('change', openImageUploadModalHandler);

imageUploadModalCloseElement.addEventListener('click', closeImageUploadModalHandler);

buttonScaleSmallerElement.addEventListener('click', zoomOutImageHandler);

buttonScaleBiggerElement.addEventListener('click', zoomInImageHandler);

export {closeImageUploadModal};
