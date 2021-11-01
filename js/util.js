const getRandomNumbarValue = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const checkLengthString = (string, validLength) => string.length <= validLength;

const getRandomArrayElement = (elements) => {
  const newElement = elements[getRandomNumbarValue(0, elements.length - 1)];

  return newElement;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл "поставить таймаут - удалить таймаут" будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};


// function debounce (callback, timeoutDelay = 500) {
//   // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
//   // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
//   let timeoutId;

//   return (...rest) => {
//     // Перед каждым новым вызовом удаляем предыдущий таймаут,
//     // чтобы они не накапливались
//     clearTimeout(timeoutId);

//     // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

//     // Таким образом цикл "поставить таймаут - удалить таймаут" будет выполняться,
//     // пока действие совершается чаще, чем переданная задержка timeoutDelay
//   };
// }


export {getRandomNumbarValue, checkLengthString, getRandomArrayElement, debounce};
