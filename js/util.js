const getRandomNumbarValue = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const checkLengthString = (lengthString, validlength) => lengthString <= validlength;

export {getRandomNumbarValue, checkLengthString};