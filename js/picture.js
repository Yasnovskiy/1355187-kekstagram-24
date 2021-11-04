const picturesListElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const removePictures = () => {
  const picturesWithBody = document.querySelectorAll('.picture');

  picturesWithBody.forEach((item) => {
    item.remove();
  });
};

const generatePictures = (objectsData, cb = () => {}) => {
  const picturesListFragment = document.createDocumentFragment();

  objectsData.forEach((data) => {
    const {url, likes, comments} = data;
    const pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      cb(data);
    });
  });

  removePictures();
  return picturesListElement.appendChild(picturesListFragment);
};

export {generatePictures};
