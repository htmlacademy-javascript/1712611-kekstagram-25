// comment = {
//   "id": 101,
//   "avatar": "img/avatar-6.svg",
//   "message": "Всё отлично!",
//   "name": Азула"
// },

function buildComment(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.setAttribute('width', 35);
  img.setAttribute('height', 35);
  img.setAttribute('src', comment.avatar);
  img.setAttribute('alt', comment.name);

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.insertAdjacentElement('beforeend', img);
  li.insertAdjacentElement('beforeend', p);

  return li;
}

// params:
//   comments = [{ comment1, comment2, ... }]
function buildComments(comments) {
  const commentsFragment = document.createDocumentFragment();
  for (const comment of comments) {
    const commentElement = buildComment(comment);
    commentsFragment.appendChild(commentElement);
  }
  return commentsFragment;
}

export {buildComments};
