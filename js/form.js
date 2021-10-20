// Открывает форм редактирования формы
const openForm = document.querySelector('.img-upload__overlay');

// Форма
const formElement = document.querySelector('.img-upload__form');

// Класс убирает скрол
const body = document.body;

// Поля для добавления хеш-тегов и описания
const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

// Кнопки для открытия и закрытия
const butOpen = document.querySelector('#upload-file');
const butСlose = document.querySelector('.img-upload__cancel');

// Для удаления через клавишу ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    initiateCloseForm();
  }
};

function initiateOpenForm() {
  openForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function initiateCloseForm() {
  const hashtagsActiveElement = document.activeElement.classList.contains('text__hashtags');
  const descriptionActiveElement = document.activeElement.classList.contains('text__description');

  if (hashtagsActiveElement || descriptionActiveElement) {
    return;
  }

  openForm.classList.add('hidden');
  body.classList.remove('modal-open');
  formElement.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

butOpen.addEventListener('change', () => {
  initiateOpenForm();
});

butСlose.addEventListener('click', () => {
  initiateCloseForm();
  formElement.reset();
});

hashtags.addEventListener('input', () => {
  const value = hashtags.value;
  const valueArr = value.split(' ');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  if (valueArr.length > 5) {
    hashtags.setCustomValidity('Количество Хэш-тегов не может быть больше пяти');
    return;
  } else {
    hashtags.setCustomValidity('');
  }

  for (let i = 0; i <= valueArr.length - 1; i++) {

    if (!re.test(valueArr[i]) && valueArr[i] !== '') {
      hashtags.setCustomValidity('Хэш-теги не могут содержать пробелы, спецсимволы, символы пунктуации, эмодзи. Максимальная длина одного хэш-тега 20 символов, включая решётку.');
    }

    for (let j = i + 1; j < valueArr.length; j++) {

      if (valueArr[i].toLowerCase() === valueArr[j].toLowerCase()) {
        hashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
      } else {
        hashtags.setCustomValidity('');
      }
    }
  }

  hashtags.reportValidity();
});

description.addEventListener('input', () => {
  const value = description.value.length;

  if (value >= 140) {
    description.setCustomValidity('Строка не может быть больше 140 сим.');
  } else {
    description.setCustomValidity('');
  }

  description.reportValidity();
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  initiateCloseForm();
  formElement.reset();
});
