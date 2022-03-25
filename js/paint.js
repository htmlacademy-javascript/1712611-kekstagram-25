function paintSmallImages(images) {
  const picturesContainerElement = document.querySelector('.pictures');

  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();

  images.forEach(({url, comments, likes}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', url);
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(picturesFragment);
}

export {paintSmallImages};
