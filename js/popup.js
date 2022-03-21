const pictures = document.querySelectorAll('.picture');
const popup = document.querySelector('.big-picture');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

popupCloseButton.onclick = function () {
  popup.classList.add('hidden');
};

for (const picture of pictures) {
  picture.onclick = function () {
    popup.classList.remove('hidden');
  };
}
