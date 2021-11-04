const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentCountView = document.querySelector('.comments-count--view');
const commentsLoader = document.querySelector('.comments-loader');

const REQUIRED_NUMBER_COMMENTS = 5;

let handlerLotComments = () => {};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', handlerLotComments);
};

// Для удаления через клавишу ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const bigPicturesListElement = document.querySelector('.social__comments');
const bigPictureTemplate = document.querySelector('.social__comment');
const bigPicturesListFragment = document.createDocumentFragment();

const createRange = (array, step) => {
  let startIndex = 0;
  const lenghtRange = array.length;
  return function () {
    const range = array.slice(startIndex, startIndex + step);
    startIndex += step;
    return {
      count: startIndex > lenghtRange ? lenghtRange : startIndex,
      range: range,
    };
  };
};

const renderComments = (array) => {

  array.forEach((arrayItem) => {
    const {avatar, name, message} = arrayItem;
    const bigPictureElement = bigPictureTemplate.cloneNode(true);

    bigPictureElement.querySelector('.social__picture').src = avatar;
    bigPictureElement.querySelector('.social__picture').alt = name;
    bigPictureElement.querySelector('.social__text').textContent = message;

    bigPicturesListFragment.appendChild(bigPictureElement);
  });

  bigPicturesListElement.appendChild(bigPicturesListFragment);
};

const showComments = (array) => {
  const commentsView = document.querySelector('.comments-count--view');

  const arrayComment = createRange(array, REQUIRED_NUMBER_COMMENTS);

  const {count, range} = arrayComment();
  commentsView.textContent = count;
  renderComments(range);

  if (range <= REQUIRED_NUMBER_COMMENTS) {
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  handlerLotComments = () => {
    const {count, range} = arrayComment();

    commentsView.textContent = count;

    if (array.length === count) {
      commentsLoader.classList.add('hidden');
    }

    renderComments(range);
  };

  commentsLoader.addEventListener('click', handlerLotComments);
};

const showBigPictures = (objectsData) => {
  const blockImg = document.querySelector('.big-picture__img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');

  blockImg.querySelector('img').src = objectsData.url;
  likes.textContent = objectsData.likes;
  comments.textContent = objectsData.comments.length;

  bigPicturesListElement.innerHTML = '';
  commentCountView.textContent = '';


  if (objectsData.comments.length <= REQUIRED_NUMBER_COMMENTS) {
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  showComments(objectsData.comments);

  const fdsdfsfsdfasf = document.querySelectorAll('.social__comment');
  commentCountView.textContent = fdsdfsfsdfasf.length;

  openBigPicture();

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPictures };
