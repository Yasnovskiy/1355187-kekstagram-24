import {NECESSARY_SUM_OBJECTS} from './const.js';
import {generateData, generateObject} from './data.js';

const objectsData = generateData(NECESSARY_SUM_OBJECTS, generateObject);

const picturesListElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

objectsData.forEach((obj) => {
  const pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = obj.url;
  pictureElement.querySelector('.picture__likes').textContent = obj.likes;
  pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;

  picturesListElement.appendChild(pictureElement);
});
