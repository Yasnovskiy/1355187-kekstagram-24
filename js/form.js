// Открывает форм редактирования формы
const openForm = document.querySelector('.img-upload__overlay');
// Форма
const formElement = document.querySelector('.img-upload__form');
// Класс убирает скрол
const body = document.body;

const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const butСlose = document.querySelector('.img-upload__cancel');
const butOpen = document.querySelector('#upload-file');

// Для удаления через клавишу ESC
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    initiateCloseForm();
    formElement.reset();
  }
};

function initiateOpenForm() {
  openForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function initiateCloseForm() {
  openForm.classList.add('hidden');
  body.classList.remove('modal-open');

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

  for (let i = 0; i <= valueArr.length; i++) {

    if (valueArr.length > 5) {
      hashtags.setCustomValidity('Количество Хэш-тегов не может быть больше пяти');
    } else {
      hashtags.setCustomValidity('');
    }

    if (!re.test(valueArr[i])) {
      hashtags.setCustomValidity('Хэш-теги не могут содердать неправила');
    } else {
      hashtags.setCustomValidity('');
    }

    for (let j = i + 1; j < valueArr.length; j++) {

      if (valueArr[i].toLowerCase() === valueArr[j].toLowerCase()) {
        hashtags.setCustomValidity('Хэш-теги не могут одинаковыми');
      } else {
        hashtags.setCustomValidity('');
      }
    }

    description.reportValidity();
  }

  hashtags.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  hashtags.reportValidity();
});

hashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
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
