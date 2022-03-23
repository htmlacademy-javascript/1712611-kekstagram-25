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
  const pictures = document.querySelectorAll('.picture');
  const popup = document.querySelector('.big-picture');
  const popupCloseButton = popup.querySelector('.big-picture__cancel');

  const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.add('hidden');
      document.removeEventListener('keydown', closeByEscape);
    }
  };

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      popup.querySelector('.social__comments').innerHTML = '';
      popup.classList.remove('hidden');
      popup.querySelector('.big-picture__img img').setAttribute('src', images[i].url);
      popup.querySelector('.likes-count').textContent = images[i].likes;
      popup.querySelector('.comments-count').textContent = images[i].comments.length;
      const commentsElement = buildComments(images[i].comments);
      popup.querySelector('.social__comments').appendChild(commentsElement);
      popup.querySelector('.social__caption').textContent = images[i].description;
      document.addEventListener('keydown', closeByEscape);
    });
  }

  popupCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('hidden');
    document.removeEventListener('keydown', closeByEscape);
  });
}

export {attachPopupEvent};
