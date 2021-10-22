// Показываю привью большой картинки
const bigPicture = document.querySelector('.big-picture');
// Класс убирает скрол с маленьких картинок
const body = document.body;
// Класс убирает rколичество коментариев
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

const showComments = (num, arrComment) => {
  let startIndex = 0;
  let endIndex = num;

  commentsLoader.addEventListener('click', () => {
    arrComment.slice(startIndex, endIndex).forEach(renderComment);
    startIndex = endIndex;
    endIndex += num;
    bigPicturesListElement.appendChild(bigPicturesListFragment);

    if (arrComment.length <= startIndex) {
      commentsLoader.classList.add('hidden');
    }
  });

  function renderComment({avatar,name,message}) {
    const bigPictureElement = bigPictureTemplate.cloneNode(true);

    bigPictureElement.querySelector('.social__picture').src = avatar;
    bigPictureElement.querySelector('.social__picture').alt = name;
    bigPictureElement.querySelector('.social__text').textContent = message;

    bigPicturesListFragment.appendChild(bigPictureElement);
  }

  arrComment.slice(startIndex, endIndex).forEach(renderComment);
  startIndex = endIndex;
  endIndex += num;

  bigPicturesListElement.appendChild(bigPicturesListFragment);
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

  showComments(5, objectsData.comments);

  const fdsdfsfsdfasf = document.querySelectorAll('.social__comment');
  commentCountView.textContent = fdsdfsfsdfasf.length;

  initiateOpenBigPicture();

  //Обработчики закрытия
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', initiateCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);

};

export { showBigPictures };

/*
  Сейчас не знаю как сделать

1. При нажатии на кнопку "Показать еще" что бы в диве, где написано сколько сейчас показанно, менялось значение
2. Повторяется код
3. Неуверен в правильности проверки на показ кнопки "Показать еще", она должна при достижение последних коментариев исчезать (сейчас работает с багом)
Баг : открываем первую картинку все норм, закрываем 1 и открываем 2(где примерно 15 комментариев) и при первом нажатии на кнопку, появятся 5, а кнопка исчазнит, хотя еще есть комементарии


*/
