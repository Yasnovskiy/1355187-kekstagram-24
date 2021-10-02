const getRandomNumbarValue = (min, max) => {

  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  // Проверки минимальное значение больше или равное максимальному
  if (min >= max) {
    return 'Минимальное значение не может быть больше Максимального! Может вы перепутили значения. Обратите на это внимание';
  }

  // И если мы прошли все проверки, будем получать рандомное число из min и max значения
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomNumbarValue(0, 1);

const checkLengthString = (lengthString, validlength) => lengthString <= validlength;

checkLengthString(20, 140);

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Андрей',
  'Алена',
  'Ольга',
  'Лев',
  'Максим',
  'Игорь',
  'Владимир',
  'Олег',
];

const generateData = (num, functionGenerate) => {
  const arrayObjects = [];

  for (let index = 1; index <= num; index++) {
    arrayObjects.push(functionGenerate(index));
  }

  return arrayObjects;
};

const generateComment = (num) => {
  const commentArray = {
    id: num,
    avatar: `img/avatar-${getRandomNumbarValue(1, 6)}.svg`,
    message: MESSAGES[getRandomNumbarValue(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumbarValue(0, NAMES.length - 1)],
  };

  return commentArray;
};

const generateObject = (num) => {
  const object = {
    id: num,
    url: `photos/${num}.jpg`,
    description: '',
    likes: getRandomNumbarValue(15, 200),
    comments: generateData(getRandomNumbarValue(1, 5), generateComment),
  };

  return object;
};

// Массив нужных данных
generateData(25, generateObject);

