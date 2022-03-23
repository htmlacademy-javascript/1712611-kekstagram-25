function getRandomNumberFromRange(from, to) {
  if (to <= from || from < 0) {
    throw new Error('Wrong arguments');
  } else {
    return Math.floor(from + Math.random() * (to - from + 1));
  }
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumberFromRange(0, elements.length - 1)];
}

function isStringInLimit(string, limit) {
  return string.length <= limit;
}

isStringInLimit('Я учу js', 10);

function buildPath(path, id, extension) {
  return path + id + extension;
}

export {getRandomNumberFromRange, getRandomArrayElement, isStringInLimit, buildPath};
