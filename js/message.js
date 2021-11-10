import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');

const closeSuccess = (keydownHandler) => {
  const success = main.querySelector('.success');

  if (success) {
    success.remove();
    document.removeEventListener('keydown', keydownHandler);
  }
};

const closeError = (keydownHandler) => {
  const error = main.querySelector('.error');

  if (error) {
    error.remove();
    document.removeEventListener('keydown', keydownHandler);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccess();
    closeError();
  }
};

document.addEventListener('keydown', onDocumentKeydown);

const showError = (errorMessage, buttonDisplay = true) => {
  const error = errorTemplate.cloneNode(true);
  error.querySelector('.error__title').textContent  = errorMessage;

  buttonDisplay ? '' : error.querySelector('.error__button').style.display = 'none';

  error.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error__inner') || evt.target.classList.contains('error__title')) {
      return;
    }

    closeError(onDocumentKeydown);
  });

  main.appendChild(error);
};

const showSuccess = () => {

  const success = successTemplate.cloneNode(true);

  success.addEventListener('click',  (evt) => {
    if (evt.target.classList.contains('success__inner') || evt.target.classList.contains('success__title')) {
      return;
    }

    closeSuccess(onDocumentKeydown);
  });


  main.appendChild(success);
};

export {showSuccess, showError};
