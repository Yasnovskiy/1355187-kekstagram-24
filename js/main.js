function getRandomNumbarValue(min, max) {
  // Округление в большую сторону, число не сможет стать меньше минимального
  min = Math.ceil(min);
  // Округление в меньшую сторону, значит число тоже будет включаться в рандомное
  max = Math.floor(max);

  // Проверка на отрицительное значение
  if (min < 0 || max < 0) {
    return 'Одно или два значения отрицательные, это недопустимый формат!';
  }

  // Проверки минимальное значение больше или равное максимальному
  if (min >= max) {
    return 'Минимальное значение не может быть больше Максимального! Может вы перепутили значения. Обратите на это внимание';
  }

  // И если мы прошли все проверки, будем получать рандомное число из min и max значения
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumbarValue(0, 1);

function checkLengthString(lengthString, validlength) {
  return lengthString <= validlength;
}

checkLengthString(20, 140);
