const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const listElement = document.querySelector('.effects__list');

const applyFilter = (caretFilter, node, value) => {
  switch (caretFilter) {
    case 'none':
      node.style.filter = '';
      break;
    case 'chrome':
      node.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      node.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      node.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      node.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      node.style.filter = `brightness(${value})`;
      break;
  }
};

let selectedFilter = null;

const filters = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const uiSliderSettings = {
  [filters.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [filters.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [filters.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  [filters.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

// Нужно прочитать доку и найти способ из коробки, для удаления, но мне так тоже нравится
const uiSliderHiden = (isHiden) => {
  if (isHiden) {
    sliderElement.style = 'display:none;';
  } else {
    sliderElement.style = 'display:block;';
  }
};

uiSliderHiden(true);

const createFunctionSlider = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imgPreviewElement.classList.remove(`effects__preview--${selectedFilter}`);
    imgPreviewElement.classList.add(`effects__preview--${evt.target.value}`);

    selectedFilter = evt.target.value;

    applyFilter(selectedFilter, imgPreviewElement, valueElement.getAttribute('value'));

    if (filters[evt.target.value.toUpperCase()] === filters.NONE) {
      uiSliderHiden(true);
      return;
    }

    uiSliderHiden(false);

    let option = {};
    switch (evt.target.value) {
      case filters.CHROME:
      case filters.SEPIA:
        option = uiSliderSettings[filters.CHROME];
        break;
      case filters.MARVIN:
        option = uiSliderSettings[filters.MARVIN];
        break;
      case filters.PHOBOS:
        option = uiSliderSettings[filters.PHOBOS];
        break;
      case filters.HEAT:
        option = uiSliderSettings[filters.HEAT];
        break;
    }

    sliderElement.noUiSlider.updateOptions(option);
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.setAttribute('value', `${values[handle]}`);

  applyFilter(selectedFilter, imgPreviewElement, valueElement.getAttribute('value'));
});

listElement.addEventListener('change', createFunctionSlider);
