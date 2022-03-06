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

const IMAGE_COUNT = 25;

const createComments = () => {

  const comments = [];
  const commentsAmount = getRandomNumberFromRange(2, 4);
  for (let i = 1; i <= commentsAmount; i++) {
    const randomNameIndex = getRandomNumberFromRange(0, NAMES.length - 1);
    const randomMessagesIndex = getRandomNumberFromRange(0, MESSAGES.length - 1);
    comments.push({
      id: getRandomNumberFromRange(10, 100),
      avatar: 'img/avatar-' + getRandomNumberFromRange(1, 6) + '.svg',
      //avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
      message: MESSAGES[randomMessagesIndex],
      name: NAMES[randomNameIndex],
    });
  }
  return comments;
};

const createImage = (e, index) => {
  const randomDescriptionIndex = getRandomNumberFromRange(0, DESCRIPTIONS.length - 1);

  return {
    id: index + 1, //id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: 'photos/' + (index + 1), //строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: DESCRIPTIONS[randomDescriptionIndex], //строка — описание фотографии. Описание придумайте самостоятельно.
    likes: getRandomNumberFromRange(15, 200), //число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    comments: createComments(),
  };
};

const Images = Array.from({length: IMAGE_COUNT}, createImage);

console.log(Images);
