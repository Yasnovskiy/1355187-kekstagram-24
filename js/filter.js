import {getRandomElements, debounce} from './util.js';
import {generatePictures} from './picture.js';
import {showBigPictures} from './big-picture.js';

const filterElement = document.querySelector('.img-filters');
const buttonElements = document.querySelectorAll('.img-filters__button');
const NUMBER_RANDOM_PHOTOS = 10;
const [defaultButtonElement, randomButtonElement, discussedButtonElement] = buttonElements;

const debounceGeneratePictures = debounce(generatePictures);

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

const filters = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

let carenSectionActive = filters.default;

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
      case filters.default : {
        setActiveButton(defaultButtonElement);
        result = array;
        break;
      }
      case filters.random : {
        setActiveButton(randomButtonElement);
        result = getRandomPictures(array, NUMBER_RANDOM_PHOTOS);
        break;
      }
      case filters.discussed : {
        setActiveButton(discussedButtonElement);
        result = getPopularComments(array);
        break;
      }
    }

    debounceGeneratePictures(result, showBigPictures);
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
