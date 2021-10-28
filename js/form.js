import { checkLengthString} from './util.js';
import { sendData } from './api.js';
import {showSuccess, showError} from './message.js';

// Открывает форм редактирования формы
const openFormElement = document.querySelector('.img-upload__overlay');

// Форма
const formElement = document.querySelector('.img-upload__form');

// Класс убирает скрол
const bodyElement = document.body;

// Поля для добавления хеш-тегов и описания
const hashtagElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

// Кнопки для открытия и закрытия
const buttonOpenForm = document.querySelector('#upload-file');
const buttonСloseForm = document.querySelector('.img-upload__cancel');

// Для удаления через клавишу ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

function openForm() {
  openFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeForm() {
  const hashtagsActiveElement = document.activeElement.classList.contains('text__hashtags');
  const descriptionActiveElement = document.activeElement.classList.contains('text__description');

  if (hashtagsActiveElement || descriptionActiveElement) {
    return;
  }

  openFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonOpenForm.addEventListener('change', () => {
  openForm();
});

buttonСloseForm.addEventListener('click', () => {
  closeForm();
  formElement.reset();
});

hashtagElement.addEventListener('input', () => {
  const hastags = hashtagElement.value.split(' ');
  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  if (hastags.length > 5) {
    hashtagElement.setCustomValidity('Количество Хэш-тегов не может быть больше пяти');
    hashtagElement.reportValidity();
    return;
  }

  for (let i = 0; i < hastags.length; i++) {

    const chekingHashtag = hastags[i];
    const isEmtpyString = chekingHashtag === '';


    if (!regex.test(chekingHashtag) && !isEmtpyString) {
      hashtagElement.setCustomValidity('Хэш-теги не могут содержать пробелы, спецсимволы, символы пунктуации, эмодзи. Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      hashtagElement.reportValidity();
      return;
    }

    for (let j = i + 1; j < hastags.length; j++) {

      const isDuplicate = chekingHashtag.toLowerCase() === hastags[j].toLowerCase();

      if (isDuplicate) {
        hashtagElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
        hashtagElement.reportValidity();
        return;
      }
    }
  }

  hashtagElement.setCustomValidity('');

  hashtagElement.reportValidity();

});

descriptionElement.addEventListener('input', () => {

  !checkLengthString(descriptionElement.value, 140) ?
    descriptionElement.setCustomValidity('Строка не может быть больше 140 сим.') :
    descriptionElement.setCustomValidity('');

  descriptionElement.reportValidity();
});

const onError = (errorMessage) => {
  showError(errorMessage);
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => showSuccess(),
    onError,
    new FormData(evt.target),
  );

  closeForm();
});

//Хочу что бы обрабатывались ошибки и когда форма отвечает сообщением, нужно что бы пользователь не мог еще раз нажать на ипут
