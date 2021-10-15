// Показываю привью большой картинки
const bigPicture = document.querySelector('.big-picture');
// Класс убирает скрол с маленьких картинок
const body = document.body;
// Класс убирает rколичество коментариев
const commentCount = document.querySelector('.social__comment-count');
// Класс убирает скрол с маленьких картинок
const commentsLoader = document.querySelector('.comments-loader');

const initiateOpenBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const initiateCloseBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

// Для удаления через клавишу ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    initiateCloseBigPicture();
  }
};

const bigPicturesListElement = document.querySelector('.social__comments');
const bigPictureTemplate = document.querySelector('.social__comment');
const bigPicturesListFragment = document.createDocumentFragment();

const showBigPictures = (objectsData) => {
  const blockImg = document.querySelector('.big-picture__img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');

  blockImg.querySelector('img').src = objectsData.url;
  likes.textContent = objectsData.likes;
  comments.textContent = objectsData.comments.length;

  bigPicturesListElement.innerHTML = '';
  objectsData.comments.forEach(({avatar, name, message}) => {
    const bigPictureElement = bigPictureTemplate.cloneNode(true);

    bigPictureElement.querySelector('.social__picture').src = avatar;
    bigPictureElement.querySelector('.social__picture').alt = name;
    bigPictureElement.querySelector('.social__text').textContent = message;

    bigPicturesListFragment.appendChild(bigPictureElement);
  });

  initiateOpenBigPicture();

  //Обработчики закрытия
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', initiateCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicturesListElement.appendChild(bigPicturesListFragment);
};

export {showBigPictures};
