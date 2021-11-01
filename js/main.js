import './form.js';
import './scale.js';
import './slider.js';
import './message.js';
import './filter.js';


import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';
import {getData} from './api.js';
import {changeFilter} from './filter.js';
import {debounce} from './util.js';

// Получение данных и создание картинок
getData((pictures) => {
  generatePictures(pictures, showBigPictures);
  debounce(changeFilter(pictures));
});
