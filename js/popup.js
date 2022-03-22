const pictures = document.querySelectorAll('.picture');
const popup = document.querySelector('.big-picture');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', closeByEscape);
  }
};

for (const picture of pictures) {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    const src = picture.querySelector('img').getAttribute('src');
    popup.querySelector('.big-picture__img img').setAttribute('src', src);
    popup.classList.remove('hidden');
    document.addEventListener('keydown', closeByEscape);
  });
}

popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  popup.classList.add('hidden');
  document.removeEventListener('keydown', closeByEscape);
});
