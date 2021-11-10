const errorMessage = (status) => {
  let error;

  switch (status) {
    case 400:
      error = 'Неверный запрос';
      break;
    case 401:
      error = 'Пользователь не авторизован';
      break;
    case 404:
      error = 'Ничего не найдено';
      break;
    case 500:
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

      throw new Error(errorMessage(response.status));
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
        onFail(errorMessage(response.status));
      }
    })
    .catch((error) => {
      onFail(error);
    });
};

export {getData, sendData};
