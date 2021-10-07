import {getRandomNumbarValue} from './util.js';

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
  'Елена',
  'Рома',
  'Сергей',
];

const DESCRIPTION = [
  'Phasellus quis mauris ac nibh.',
  'Duis pellentesque tincidunt urna vel.',
  'Vestibulum ante ipsum primis in.',
  'Curabitur laoreet tristique luctus. Quisque.',
  'Integer vitae augue in ligula.',
  'Quisque aliquam purus ac dui.',
  'Morbi iaculis imperdiet pretium. Proin.',
  'Integer ullamcorper, eros in porttitor.',
  'Donec pulvinar metus est, et.',
  'Sed ac velit quis neque.',
];

const NECESSARY_SUM_OBJECTS = 25;

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
  const necessarySumObjects = getRandomNumbarValue(1, 5);

  const object = {
    id: num,
    url: `photos/${num}.jpg`,
    description: DESCRIPTION[getRandomNumbarValue(0, DESCRIPTION.length - 1)],
    likes: getRandomNumbarValue(15, 200),
    comments: generateData(necessarySumObjects, generateComment),
  };

  return object;
};

// Массив нужных данных
generateData(NECESSARY_SUM_OBJECTS, generateObject);
