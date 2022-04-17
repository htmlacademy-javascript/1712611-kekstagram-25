import {paintSmallImages} from './paint.js';
import {getRandomNumberFromRange} from './util.js';
import {attachPopupEvent} from './popup.js';

const imageFiltersElement = document.querySelector('.img-filters');
const imageFilterDefaultElement = document.querySelector('#filter-default');
const imageFilterRandomElement = document.querySelector('#filter-random');
const imageFilterDiscussedElement = document.querySelector('#filter-discussed');

function activateFilters() {
  imageFiltersElement.classList.remove('img-filters--inactive');
}

function getRandomImages(images) {
  const result = [];
  const copiedImages = images.slice();
  const maxImagesNumber = images.length > 10 ? 10 : images.length;
  for (let i = 0; i < maxImagesNumber; i++) {
    const randomIndex = getRandomNumberFromRange(0, copiedImages.length - 1);
    result.push(copiedImages.splice(randomIndex, 1)[0]);
  }

  return result;
}

function sortMostDiscussedImages(images) {
  const copiedImages = images.slice();
  function compareCommentsNumber(a, b) {
    return b.comments.length - a.comments.length;
  }

  return copiedImages.sort(compareCommentsNumber);
}

function removeImages() {
  const picturesCollection = document.querySelectorAll('.picture');
  picturesCollection.forEach((picture) => {
    picture.remove();
  });
}

function activateFiltersButton (target) {
  const filtersButtonCollection = document.querySelectorAll('.img-filters__button');
  for (let i = 0; i < filtersButtonCollection.length; i++) {
    if (filtersButtonCollection[i] === target) {
      filtersButtonCollection[i].classList.add('img-filters__button--active');
    }
    if (filtersButtonCollection[i] !== target) {
      filtersButtonCollection[i].classList.remove('img-filters__button--active');
    }
  }
}

function attachFiltersEvents(images) {
  imageFilterDefaultElement.addEventListener('click', (evt) => {
    activateFiltersButton(evt.target);
    removeImages();

    paintSmallImages(images);
    attachPopupEvent(images);
  });

  imageFilterRandomElement.addEventListener('click', (evt) => {
    activateFiltersButton(evt.target);
    removeImages();

    const rendomImages = getRandomImages(images);
    paintSmallImages(rendomImages);
    attachPopupEvent(rendomImages);
  });

  imageFilterDiscussedElement.addEventListener('click', (evt) => {
    activateFiltersButton(evt.target);
    removeImages();

    const filteredImages = sortMostDiscussedImages(images);
    paintSmallImages(filteredImages);
    attachPopupEvent(filteredImages);
  });
}

export {activateFilters, attachFiltersEvents};
