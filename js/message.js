const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');


const onDocumentKeydown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccess();
    closeError();
  }
};


function closeSuccess() {
  const success = main.querySelector('.success');

  if (success) {
    success.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}


function closeError() {
  const error = main.querySelector('.error');

  if (error) {
    error.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

const showError = () => {
  const error = errorTemplate.cloneNode(true);
  // error.querySelector('.error__title').textContent  = errorMessage;

  error.addEventListener('click',  () => {
    closeError();
  });

  document.addEventListener('keydown', onDocumentKeydown);

  main.appendChild(error);
};

const showSuccess = () => {

  const success = successTemplate.cloneNode(true);

  success.addEventListener('click',  () => {
    closeSuccess();
  });

  document.addEventListener('keydown', onDocumentKeydown);

  main.appendChild(success);
};


export {showSuccess, showError};
