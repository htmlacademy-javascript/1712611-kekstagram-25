import {paintSmallImages} from './paint.js';
import {getRandomNumberFromRange, debounce} from './util.js';
import {attachPopupEvent} from './popup.js';

const RERENDER_DELAY = 500;

const imageFiltersElement = document.querySelector('.img-filters');
const imageFilterDefaultElement = document.querySelector('#filter-default');
const imageFilterRandomElement = document.querySelector('#filter-random');
const imageFilterDiscussedElement = document.querySelector('#filter-discussed');

function activateFilters() {
  imageFiltersElement.classList.remove('img-filters--inactive');
}

function getRandomImages(images) {
  const results = [];
  const copiedImages = images.slice();
  const maxImagesNumber = images.length > 10 ? 10 : images.length;
  for (let i = 0; i < maxImagesNumber; i++) {
    const randomIndex = getRandomNumberFromRange(0, copiedImages.length - 1);
    results.push(copiedImages.splice(randomIndex, 1)[0]);
  }

  return results;
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
  filtersButtonCollection.forEach((filtersButton) => {
    if (filtersButton === target) {
      filtersButton.classList.add('img-filters__button--active');
    }
    if (filtersButton !== target) {
      filtersButton.classList.remove('img-filters__button--active');
    }
  });
}

function attachFiltersEvents(images) {
  function filterDefaultImagesHandler(evt) {
    activateFiltersButton(evt.target);
    removeImages();

    paintSmallImages(images);
    attachPopupEvent(images);
  }

  function filterRandomImagesHandler(evt) {
    activateFiltersButton(evt.target);
    removeImages();

    const randomImages = getRandomImages(images);
    paintSmallImages(randomImages);
    attachPopupEvent(randomImages);
  }

  function filterDiscussedImagesHandler(evt) {
    activateFiltersButton(evt.target);
    removeImages();

    const filteredImages = sortMostDiscussedImages(images);
    paintSmallImages(filteredImages);
    attachPopupEvent(filteredImages);
  }

  imageFilterDefaultElement.addEventListener('click', debounce(filterDefaultImagesHandler, RERENDER_DELAY));

  imageFilterRandomElement.addEventListener('click', debounce(filterRandomImagesHandler, RERENDER_DELAY));

  imageFilterDiscussedElement.addEventListener('click', debounce(filterDiscussedImagesHandler, RERENDER_DELAY));
}

export {activateFilters, attachFiltersEvents};
