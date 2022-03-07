const DESCRIPTIONS = [
  'Следуй за своим сердцем, но не забывай брать с собой мозг.',
  'Успех следует за упорным трудом.',
  'Вперед к новым вершинам.',
  'Только цель, никаких препятствий.',
  'Что делать, когда не знаешь, что делать? В любой непонятной ситуации немедленно начинай обнимать кота…',
  'Люблю хэштеги, они напоминают вафельки',
  'Ошибки являются доказательством того, что вы пытались.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Аанг',
  'Зуко',
  'Катара',
  'Сокка',
  'Айро',
  'Азула',
  'Озай',
  'Азулон',
  'Мэй',
  'Джао',
];

const IMAGES_COUNT = 25;

function getRandomNumberFromRange(from, to) {
  if (to <= from || from < 0) {
    throw new Error('Wrong arguments');
  } else {
    return Math.floor(from + Math.random() * (to - from + 1));
  }
}

function isStringInLimit(string, limit) {
  return string.length <= limit;
}

isStringInLimit('Я учу js', 10);

function buildPath(path, id, extension) {
  return path + id + extension;
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumberFromRange(0, elements.length - 1)];
}

const createComments = (index) => {

  const comments = [];
  const commentsAmount = getRandomNumberFromRange(2, 4);
  for (let i = 1; i <= commentsAmount; i++) {
    comments.push({
      id: index * 100 + i,
      avatar: buildPath('img/avatar-', getRandomNumberFromRange(1, 6), '.svg'),
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

const createImage = (index) => ({
  id: index,
  url: buildPath('photos/', index, '.jpg'), //строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumberFromRange(15, 200), //число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: createComments(index),
});

const createImages = () => {

  const images = [];
  for (let i = 1; i <= IMAGES_COUNT; i++) {
    images.push(
      createImage(i)
    );
  }
  return images;
};

createImages();
