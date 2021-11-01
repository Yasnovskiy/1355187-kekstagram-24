import {getRandomArrayElement} from './util.js';
import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';

const filterElement = document.querySelector('.img-filters');
const buttonElement = document.querySelectorAll('.img-filters__button');

const removeActive = () => {
  buttonElement.forEach((buttonIteam) => {
    buttonIteam.classList.remove('img-filters__button--active');
  });
};

function createRandomRangeGenerator (array) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomArrayElement(array);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArrayElement(array);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomFilterElements = (array) => {
  const generatePhotoId = createRandomRangeGenerator(array);

  const arr1 = [];

  for (let i = 0; i < 10; i++) {
    arr1[i] = generatePhotoId();
  }

  return arr1;
};

const getPopularComments = (array) => {
  const arrayValue = array.slice();

  arrayValue.sort((first, second) => {

    if (first.comments > second.comments) {
      return -1;
    }
    if (first.comments < second.comments) {
      return 1;
    }

    return 0;
  });

  return arrayValue;
};

let carenSectionActive = 'filter-default';

const filterCheck = (evt, array) => {
  if (carenSectionActive === evt.target.id) {
    return;
  }

  removeActive();

  if (evt.target.matches('.img-filters__button')) {
    carenSectionActive = evt.target.id;

    switch (evt.target.id) {
      case 'filter-default': {
        buttonElement[0].classList.add('img-filters__button--active');
        generatePictures(array, showBigPictures);
        break;
      }
      case 'filter-random': {
        buttonElement[1].classList.add('img-filters__button--active');
        const result = getRandomFilterElements(array);
        generatePictures(result, showBigPictures);
        break;
      }
      case 'filter-discussed': {
        buttonElement[2].classList.add('img-filters__button--active');
        const result = getPopularComments(array);
        generatePictures(result, showBigPictures);
        break;
      }
    }
  }
};


const changeFilter = (array, cb = () => {}) => {
  filterElement.classList.remove('img-filters--inactive');

  filterElement.addEventListener('click', (evt) => {
    filterCheck(evt, array);
    cb;
  });
};

export {changeFilter};
