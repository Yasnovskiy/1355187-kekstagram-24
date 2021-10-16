import './util.js';
import './const.js';
import './data.js';
import './picture.js';
import './big-picture.js';
import './form.js';

import {NECESSARY_SUM_OBJECTS} from './const.js';
import {generateData, generateObject} from './data.js';
import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';


// Массив нужных данных
const objectsData = generateData(NECESSARY_SUM_OBJECTS, generateObject);

// Добавляем фото с количеством комментарий и лайков
generatePictures(objectsData, showBigPictures);
