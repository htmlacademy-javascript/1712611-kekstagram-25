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
    if (evt.key === 'Escape') {
      popupElement.classList.add('hidden');
      document.removeEventListener('keydown', documentKeydownHandler);
    }
  }

  for (let i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      popupElement.querySelector('.social__comments').innerHTML = '';
      popupElement.classList.remove('hidden');
      popupElement.querySelector('.big-picture__img img').setAttribute('src', images[i].url);
      popupElement.querySelector('.likes-count').textContent = images[i].likes;
      popupElement.querySelector('.comments-count').textContent = images[i].comments.length;
      const commentsElement = buildComments(images[i].comments);
      popupElement.querySelector('.social__comments').appendChild(commentsElement);
      popupElement.querySelector('.social__caption').textContent = images[i].description;
      document.addEventListener('keydown', documentKeydownHandler);
      popupElement.querySelector('.social__comment-count').classList.add('hidden');
      popupElement.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
    });
  }

  popupCloseButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
  });
}

export {attachPopupEvent};
