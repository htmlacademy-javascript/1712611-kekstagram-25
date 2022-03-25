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

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;
  listElement.insertAdjacentElement('beforeend', imgElement);
  listElement.insertAdjacentElement('beforeend', p);

  return listElement;
}

// params:
//   comments = [{ comment1, comment2, ... }]
function buildComments(comments) {
  const commentsFragmentElement = document.createDocumentFragment();
  for (const comment of comments) {
    const commentElement = buildComment(comment);
    commentsFragmentElement.appendChild(commentElement);
  }
  return commentsFragmentElement;
}

export {buildComments};
