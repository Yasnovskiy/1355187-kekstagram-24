const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const blockImg = document.querySelector('.img-upload__preview');
const img = blockImg.querySelector('img');
const inputFile = document.querySelector('.img-upload__input');

inputFile.addEventListener('change', () => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    img.src = URL.createObjectURL(file);
  }
});
