const picturesListElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

const generatePictures = (objectsData) => {

  objectsData.forEach(({url, likes, comments}) => {
    const pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.appendChild(pictureElement);
  });

  return picturesListElement.appendChild(picturesListFragment);
};

export {generatePictures};
