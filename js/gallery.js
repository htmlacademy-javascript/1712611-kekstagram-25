import {paintSmallImages} from './paint.js';
import {attachPopupEvent} from './popup.js';
import {setUploadFormSubmit} from './upload-form.js';
import {showAlert} from './util.js';
import {activateFilters, attachFiltersEvents} from './filters.js';

let loadedImages = [];

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showAlert('Не удалось загрузить данные');
    }})
  .then((images) => {
    loadedImages = images;
    paintSmallImages(loadedImages);
    attachPopupEvent(loadedImages);
    activateFilters();
    attachFiltersEvents(loadedImages);
  });

setUploadFormSubmit();
