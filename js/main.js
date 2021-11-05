import './util.js';
import './form.js';
import './picture.js';
import './big-picture.js';
import './scale.js';
import './slider.js';
import './message.js';
import './filter.js';
import './file.js';

import {getData} from './api.js';
import {changeFilter} from './filter.js';

// Получение данных и создание картинок
getData((pictures) => {
  changeFilter(pictures);
});
