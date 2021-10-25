const buttonBiggerElement = document.querySelector('.scale__control--bigger');
const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const inputElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview');

const getNewInputValue = (calculation) => {
  const newInputValue = Number(inputElement.value.replace('%', ''));

  const isCalculation = calculation ? newInputValue + 25 : newInputValue - 25 ;

  inputElement.setAttribute('value', `${isCalculation}%`);
  imgPreviewElement.style.transform = `scale(${inputElement.getAttribute('value')})`;
};


buttonBiggerElement.addEventListener('click', () => {
  if (inputElement.value === '100%') {
    return;
  }

  getNewInputValue(true);
});

buttonSmallerElement.addEventListener('click', () => {
  if (inputElement.value === '25%') {
    return;
  }

  getNewInputValue(false);
});
