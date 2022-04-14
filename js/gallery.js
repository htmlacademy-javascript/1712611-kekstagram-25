import {paintSmallImages} from './paint.js';
import {attachPopupEvent} from './popup.js';
import {closeImageUploadModal} from './upload.js';
import {setUploadFormSubmit} from './upload-form.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Не удалось загрузить данные');
    }})
  .then((images) => {
    paintSmallImages(images);
    attachPopupEvent(images);
  });

setUploadFormSubmit();
