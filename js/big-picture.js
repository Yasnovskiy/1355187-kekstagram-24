// Показываю привью большой картинки
const bigPicture = document.querySelector('.big-picture');
// Класс убирает скрол с маленьких картинок
const body = document.body;
// Класс убирает количество коментариев
const commentCount = document.querySelector('.social__comment-count');
const commentCountView = document.querySelector('.comments-count--view');
// Класс убирает скрол с маленьких картинок
const commentsLoader = document.querySelector('.comments-loader');

const initiateOpenBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
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

  const arrayComment = createRange(array, 5);

  const {
    count,
    range,
  } = arrayComment();
  commentsView.textContent = count;
  renderComments(range);

  if (range <= 5) {
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  commentsLoader.addEventListener('click', () => {
    const {count, range} = arrayComment();

    commentsView.textContent = count;

    /*тут как то стронно работает, получается при нажатии на первой фотографии все окей, но когда мы откроем любую другую где комментарий большем чем на первой
      то при нажати на Загрузить еще то каунт кинет сначало последнее значение 1 фотографии, а через секунду кинет второе значение (которое сейчас есть)
      про html это пофигу, так как он еще раз изменит, а для проверке нет, она сразу удалят класс....Я не знаю что делать.
      Сделать тайм аут, или как то проверять несколько раз
    */
    console.log(count);

    if (array.length === count) {
      commentsLoader.classList.add('hidden');
    }

    renderComments(range);

  });
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


  if (objectsData.comments.length <= 5) {
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  showComments(objectsData.comments);

  const fdsdfsfsdfasf = document.querySelectorAll('.social__comment');
  commentCountView.textContent = fdsdfsfsdfasf.length;

  initiateOpenBigPicture();

  //Обработчики закрытия
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', initiateCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);

};

export { showBigPictures };
