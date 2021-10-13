import {NECESSARY_SUM_OBJECTS} from './const.js';
import {generateData, generateObject} from './data.js';

const objectsData = generateData(NECESSARY_SUM_OBJECTS, generateObject);

const picturesListElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

objectsData.forEach(({url, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesListFragment.appendChild(pictureElement);
});

picturesListElement.appendChild(picturesListFragment);
