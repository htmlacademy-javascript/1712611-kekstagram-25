import {createImages} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = createImages(25);
const picturesFragment = document.createDocumentFragment();

pictures.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', url);
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  picturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(picturesFragment);
