import {buildComment} from './comments.js';
import {isEscapeKey} from './util.js';

const COMMENTS_AMOUNT = 5;

const commentsContainerElement = document.body.querySelector('.social__comments');
const commentsLoaderButtonElement = document.body.querySelector('.comments-loader');
const commentsCurrentCountElement = document.querySelector('.social__comment-count').childNodes[0];

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

  function setupModal(image) {
    popupElement.querySelector('.social__comments').innerHTML = '';

    function renderComments() {
      let startIndex = 0;
      let endIndex = startIndex + COMMENTS_AMOUNT - 1;

      if (endIndex > image.comments.length - 1) {
        endIndex = image.comments.length - 1;
      }

      return function() {
        for (startIndex; startIndex <= endIndex; startIndex++) {
          const commentsElement = buildComment(image.comments[startIndex]);
          commentsContainerElement.appendChild(commentsElement);
        }

        endIndex = startIndex + COMMENTS_AMOUNT - 1;
        if (endIndex > image.comments.length - 1) {
          endIndex = image.comments.length - 1;
        }
        if (startIndex > endIndex) {
          commentsLoaderButtonElement.classList.add('hidden');
        }

        commentsCurrentCountElement.nodeValue = `${startIndex} из `;
      };
    }

    const showMoreHandler = renderComments();

    function documentKeydownHandler(evt) {
      if (isEscapeKey(evt)) {
        closeModal(evt);
      }
    }

    function closeModal(evt) {
      evt.preventDefault();
      popupElement.classList.add('hidden');
      document.removeEventListener('keydown', documentKeydownHandler);
      document.querySelector('body').classList.remove('modal-open');
      commentsLoaderButtonElement.removeEventListener('click', showMoreHandler);
      commentsLoaderButtonElement.classList.remove('hidden');
    }

    function openModal() {
      popupElement.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', documentKeydownHandler);

      popupCloseButtonElement.addEventListener('click', closeModal);
    }

    showMoreHandler();

    commentsLoaderButtonElement.addEventListener('click', showMoreHandler);

    popupElement.querySelector('.big-picture__img img').setAttribute('src', image.url);
    popupElement.querySelector('.likes-count').textContent = image.likes;
    popupElement.querySelector('.comments-count').textContent = image.comments.length;
    popupElement.querySelector('.social__caption').textContent = image.description;
    openModal();
  }

  for (let i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      setupModal(images[i]);
    });
  }
}

export {attachPopupEvent};
