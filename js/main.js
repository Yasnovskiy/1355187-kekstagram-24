import './util.js';
import './form.js';
import './picture.js';
import './big-picture.js';
import './scale.js';
import './slider.js';
import './file.js';

import {getData} from './api.js';
import {changeFilter} from './filter.js';
import {showError} from './message.js';

const onFail = (errorMessage) => {
  const buttonDisplay = false;

  showError(errorMessage, buttonDisplay);
};

// Получение данных и создание картинок
getData((pictures) => {
  changeFilter(pictures);
}, onFail);
