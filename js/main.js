function getRandomNumberFromRange(from, to) {
  if (to <= from || from < 0) {
    throw new Error('Wrong arguments');
  } else {
    return Math.floor(from + Math.random() * (to - from + 1));
  }
}

getRandomNumberFromRange(10, 100);

function isStringInLimit(string, limit) {
  return string.length <= limit;
}

isStringInLimit('Я учу js', 10);
