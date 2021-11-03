import './util.js';
import './form.js';
import './scale.js';
import './slider.js';
import './message.js';

import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';
import {getData} from './api.js';

// Получение данных и создание картинок
getData((pictures) => {
  generatePictures(pictures, showBigPictures);
});
