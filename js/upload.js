import {isEscapeKey} from './util.js';
import './upload-form.js';

const imageUploadModalElement = document.querySelector('.img-upload__overlay');
const imageUploadElement = document.querySelector('#upload-file');
const imageUploadModalCloseElement = imageUploadModalElement.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeImageUploadModal(evt);
  }
}

function openImageUploadModal () {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
}

function closeImageUploadModal(evt) {
  evt.preventDefault();
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadForm.reset(); //обнуляет поля формы
}

imageUploadElement.addEventListener('change', () => {
  openImageUploadModal();
});

imageUploadModalCloseElement.addEventListener('click', (evt) => {
  closeImageUploadModal(evt);
});

export {closeImageUploadModal};