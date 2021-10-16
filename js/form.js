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
  }
};

function initiateOpenForm() {
  openForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function initiateCloseForm (){
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
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  if (!value.match(re)) {
    hashtags.setCustomValidity('Хэш-тег всегда начинается с # и после нее может содержать пробелы, спецсимволы, символы пунктуации. Хэш-теги разделяются пробелами и длина одного 20 символов, включая решётку.');
  } else {
    hashtags.setCustomValidity('');
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
