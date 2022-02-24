function getRandNumFromRange(from, to) {
  if (to < from) {
    throw new Error('Second argument should be bigger then first');
  } else {
    return Math.floor(from + Math.random() * (to - from + 1));
  }
}

getRandNumFromRange(10, 100);

function isStringInLimit(string, limit) {
  if (string.length < limit) {
    return true;
  } else {
    return false;
  }
}

isStringInLimit('Я учу js', 10);
