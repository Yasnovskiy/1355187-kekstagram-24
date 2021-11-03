import {getRandomElements, debounce} from './util.js';
import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';

const filterElement = document.querySelector('.img-filters');
const buttonElements = document.querySelectorAll('.img-filters__button');

const [defaultButtonElement, randomBattonElement, discussedButtonElement] = buttonElements;

const removeActive = () => {
  buttonElements.forEach((buttonIteam) => {
    buttonIteam.classList.remove('img-filters__button--active');
  });
};

const getRandomPictures = (array, quantityElement) => {
  const generatePhotoId = getRandomElements(array);

  const arrayValue = [];

  for (let i = 0; i < quantityElement; i++) {
    arrayValue[i] = generatePhotoId();
  }

  return arrayValue;
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


const setActiveButton = (buttonElement) => {
  buttonElement.classList.add('img-filters__button--active');
};

let carenSectionActive = 'filter-default';

const filterCheck = (evt, array) => {
  const selectedFilter = evt.target.id;

  if (carenSectionActive === selectedFilter) {
    return;
  }

  removeActive();

  if (evt.target.matches('.img-filters__button')) {
    carenSectionActive = selectedFilter;

    let result;
    switch (selectedFilter) {
      case 'filter-default': {
        setActiveButton(defaultButtonElement);
        result = array;
        break;
      }
      case 'filter-random': {
        setActiveButton(randomBattonElement);
        result = getRandomPictures(array, 10);
        break;
      }
      case 'filter-discussed': {
        setActiveButton(discussedButtonElement);
        result = getPopularComments(array);
        break;
      }
    }

    debounce(generatePictures(result, showBigPictures));
  }
};


const changeFilter = (array) => {
  filterElement.classList.remove('img-filters--inactive');

  generatePictures(array, showBigPictures);

  filterElement.addEventListener('click', (evt) => {
    filterCheck(evt, array);
  });
};

export {changeFilter};
