const statusError = {
  'BAD REQUEST': 400,
  'UNDEFINED USER': 401,
  'NOT FOUND': 404,
  'SERVER ERROR': 500,
};

const getErrorMessage = (status) => {
  let error;

  switch (status) {
    case statusError['BAD REQUEST']:
      error = 'Неверный запрос';
      break;
    case statusError['UNDEFINED USER']:
      error = 'Пользователь не авторизован';
      break;
    case statusError['NOT FOUND']:
      error = 'Ничего не найдено';
      break;
    case statusError['SERVER ERROR']:
      error = 'Внутренняя ошибка сервера';
      break;
  }

  return error;
};

const getData = (onSuccess, onFail) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram/data', {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(getErrorMessage(response.status));
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onFail(error);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(getErrorMessage(response.status));
      }
    })
    .catch((error) => {
      onFail(error);
    });
};

export {getData, sendData};
