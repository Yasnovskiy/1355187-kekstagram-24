import './util.js';
import './data.js';

import {NECESSARY_SUM_OBJECTS} from './const.js';
import {generateData, generateObject} from './data.js';

// Массив нужных данных
const objectsData = generateData(NECESSARY_SUM_OBJECTS, generateObject);

export {objectsData};
