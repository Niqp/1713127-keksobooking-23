const getRandomInteger = (min, max) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomFloat = (min, max, precision) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  return parseFloat((Math.random() * (upper - lower) + lower).toFixed(precision));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0,elements.length - 1)];
const getRandomArrayQuantity = (elements) => getRandomInteger(1,elements.length);

//deletes from original array
const getRandomArrayItem = (itemList) => {
  if (itemList.length === 0) {
    throw new Error('Массив пустой!');
  }
  const itemSeed = getRandomInteger(0,itemList.length-1);
  const currentItem = itemList[itemSeed];
  itemList.splice(itemSeed,1);
  return currentItem;
};

//deletes from copied array
const getRandomArrayItems = (itemList,itemQuantity) => {
  if (itemList.length === 0) {
    throw new Error('Массив пустой!');
  }
  itemQuantity=Math.abs(itemQuantity);
  const itemsRemaining = itemList.slice();
  const items = new Array(itemQuantity).fill(null).map( () => {
    const itemSeed = getRandomInteger(0,itemsRemaining.length-1);
    const currentItem = itemsRemaining[itemSeed];
    itemsRemaining.splice(itemSeed,1);
    return currentItem;
  });
  return items;
};

const generateRandomData = () => {
  const OBJECTS_TO_GENERATE = 10;
  const TYPE_OPTIONS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const TIME_OPTIONS = ['12:00','13:00','14:00'];
  const FEATURES_OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const DESCRIPTION_PLACEHOLDER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const PHOTOS_OPTIONS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const avatarStringOptions = new Array(OBJECTS_TO_GENERATE).fill(null).map( (value,index) => {
    let number = index+1;
    if (number.toString().length === 1) {
      number = `0${number}`;
    }
    return `img/avatars/user${String(number)}`;
  });

  const generateRandomObject = (index) => {

    const currentLat = getRandomFloat(35.65,35.70,3);
    const currentLng = getRandomFloat(139.7,139.8,4);
    const currentTime = getRandomArrayElement(TIME_OPTIONS);

    return {
      author: {avatar:getRandomArrayItem(avatarStringOptions)},
      offer: {
        title:`Случайная карточка №${index+1}`,
        address:`${currentLat}, ${currentLng}`,
        price: getRandomInteger(1,100000),
        type: getRandomArrayElement(TYPE_OPTIONS),
        rooms: getRandomInteger(1,10),
        guests: getRandomInteger(1,10),
        checkin: currentTime,
        checkout: currentTime,
        features: getRandomArrayItems(FEATURES_OPTIONS,getRandomArrayQuantity(FEATURES_OPTIONS)),
        description: `Описание карточки №${index+1} ${DESCRIPTION_PLACEHOLDER}`,
        photos: getRandomArrayItems(PHOTOS_OPTIONS,getRandomArrayQuantity(PHOTOS_OPTIONS)),
      },
      location: {
        lat: currentLat,
        lng: currentLng,
      },
    };
  };
  return new Array(OBJECTS_TO_GENERATE).fill('').map((value,index) => generateRandomObject(index));
};

generateRandomData();
