function getRandomNumbarTheValue(min, max) {

  if (min <= max) {
    const randomNumbar = Math.random() * (max - min);

    return Math.ceil(randomNumbar);
  } else {
    return 'Минимальное значение не может быть больше Максимального! Может вы перепутили значения. Обратите на это внимание';
  }
}

getRandomNumbarTheValue(20, 1740);

function checkStringLength(lengthString) {
  // 140 из технического задания
  return lengthString <= 140;
}

checkStringLength(20);
