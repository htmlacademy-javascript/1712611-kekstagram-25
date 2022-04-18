// comment = {
//   "id": 101,
//   "avatar": "img/avatar-6.svg",
//   "message": "Всё отлично!",
//   "name": Азула"
// },

function buildComment(comment) {
  const listElement = document.createElement('li');
  listElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.setAttribute('width', 35);
  imgElement.setAttribute('height', 35);
  imgElement.setAttribute('src', comment.avatar);
  imgElement.setAttribute('alt', comment.name);

  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = comment.message;
  listElement.insertAdjacentElement('beforeend', imgElement);
  listElement.insertAdjacentElement('beforeend', pElement);

  return listElement;
}

export {buildComment};
