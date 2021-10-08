import {getRandomNumbarValue} from './util.js';
import {MESSAGES, NAMES, DESCRIPTION} from './const.js';

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

export {generateData, generateObject};
