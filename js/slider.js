const sliderBox = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const listElement = document.querySelector('.effects__list');

const filters = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const applyFilter = (createFilter, node, value) => {
  switch (createFilter) {
    case filters.NONE:
      node.style.filter = '';
      break;
    case filters.CHROME:
      node.style.filter = `grayscale(${value})`;
      break;
    case filters.SEPIA:
      node.style.filter = `sepia(${value})`;
      break;
    case filters.MARVIN:
      node.style.filter = `invert(${value}%)`;
      break;
    case filters.PHOBOS:
      node.style.filter = `blur(${value}px)`;
      break;
    case filters.HEAT:
      node.style.filter = `brightness(${value})`;
      break;
  }
};

let selectedFilter = null;

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

const uiSliderHidden = () => {
  sliderBox.style = 'display:none;';
};

const uiSliderShow = () => {
  sliderBox.style = 'display:block;';
};

uiSliderHidden();

const handlerUISliderChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imgPreviewElement.classList.remove(`effects__preview--${selectedFilter}`);
    imgPreviewElement.classList.add(`effects__preview--${evt.target.value}`);

    selectedFilter = evt.target.value;

    applyFilter(selectedFilter, imgPreviewElement, valueElement.getAttribute('value'));

    if (filters[evt.target.value.toUpperCase()] === filters.NONE) {
      uiSliderHidden();
      return;
    }

    uiSliderShow();

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

listElement.addEventListener('change', handlerUISliderChange);

export {uiSliderHidden as uiSliderHiden};

