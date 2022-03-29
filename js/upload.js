import {isEscapeKey} from './util.js';
import './upload-form.js';

const imageUploadModalElement = document.querySelector('.img-upload__overlay');
const imageUploadElement = document.querySelector('#upload-file');
const imageUploadModalCloseElement = imageUploadModalElement.querySelector('.img-upload__cancel');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeImageUploadModal(evt);
  }
}

function openImageUploadModal () {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);

  imageUploadModalCloseElement.addEventListener('click', (evt) => {
    closeImageUploadModal(evt);
  });
}

function closeImageUploadModal(evt) {
  evt.preventDefault();
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  imageUploadElement.value = '';
}

imageUploadElement.addEventListener('change', () => {
  openImageUploadModal();
});
