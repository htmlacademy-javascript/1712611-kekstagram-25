import {buildComments} from './comments.js';

// images = [
//   { "id":1,
//      "url":"photos/1.jpg",
//      "description":"Ошибки являются доказательством того, что вы пытались.",
//      "likes":46,
//      "comments":[
//        {
//          "id":101,
//          "avatar": "img/avatar-6.svg",
//          "message":"Всё отлично!",
//          "name":"Азула"
//        },
//      ]
//   }
// ]

function attachPopupEvent(images) {
  const pictureElements = document.querySelectorAll('.picture');
  const popupElement = document.querySelector('.big-picture');
  const popupCloseButtonElement = popupElement.querySelector('.big-picture__cancel');

  function documentKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeModal(evt);
    }
  }

  function setupModal(image) {
    const commentsElement = buildComments(image.comments);
    popupElement.querySelector('.social__comments').innerHTML = '';

    popupElement.querySelector('.big-picture__img img').setAttribute('src', image.url);
    popupElement.querySelector('.likes-count').textContent = image.likes;
    popupElement.querySelector('.comments-count').textContent = image.comments.length;

    popupElement.querySelector('.social__comments').appendChild(commentsElement);
    popupElement.querySelector('.social__caption').textContent = image.description;
    popupElement.querySelector('.social__comment-count').classList.add('hidden');
    popupElement.querySelector('.comments-loader').classList.add('hidden');
  }

  function openModal() {
    popupElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', documentKeydownHandler);

    popupCloseButtonElement.addEventListener('click', (evt) => {
      closeModal(evt);
    });
  }

  function closeModal(evt) {
    evt.preventDefault();
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
    document.querySelector('body').classList.remove('modal-open');
  }

  for (let i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      setupModal(images[i]);
      openModal();
    });
  }
}

export {attachPopupEvent};
