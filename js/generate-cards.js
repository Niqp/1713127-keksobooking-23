import { generateRandomData } from './generate-random-data.js';
const FLAT_TYPES_TEXT = {
  palace : 'Дворец',
  flat : 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const generatedData = generateRandomData();

const replaceText = (place,selector,data) => {
  const currentPlace = place.querySelector(selector);
  if (data) {
    currentPlace.textContent = data;
  } else {
    currentPlace.classList.add('.hidden');
  }
};

const replacePhotos = (place,item) => {
  const photos = place.querySelector('.popup__photos');
  const photo = place.querySelector('.popup__photo');
  photo.remove();
  if (item.length === 0) {
    photos.remove();
    return;
  }
  item.forEach((value) => {
    const currentPhoto = photo.cloneNode(true);
    currentPhoto.src = value;
    photos.appendChild(currentPhoto);
  });
};

const replaceFeatures = (place,item) => {
  const featureClasses = item.map((feature) => `popup__feature--${feature}`);
  const featureBlock = place.querySelector('.popup__features');
  featureBlock.textContent = '';
  if (featureClasses.length === 0) {
    featureBlock.remove();
    return;
  }
  featureClasses.forEach((featureClass) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add(featureClass);
    featureBlock.appendChild(feature);
  });
};

const generateCards = (data) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardPopup = cardTemplate.querySelector('.popup');
  const cards = data.map((item) => {
    const card = cardPopup.cloneNode(true);
    replaceText(card,'.popup__title',item.offer.title);
    replaceText(card,'.popup__text--address',item.offer.address);
    replaceText(card,'.popup__text--price',`${item.offer.price} ₽/ночь`);
    replaceText(card,'.popup__type',FLAT_TYPES_TEXT[item.offer.type]);
    replaceText(card,'.popup__text--capacity',`${item.offer.rooms} комнаты для ${item.offer.guests} гостей.`);
    replaceText(card,'.popup__text--time',`Заезд после ${item.offer.checkin}, выезд после ${item.offer.checkout}`);
    replaceText(card,'.popup__description',item.offer.description);
    replacePhotos(card,item.offer.photos);
    replaceFeatures(card,item.offer.features);
    const avatar = card.querySelector('.popup__avatar');
    avatar.src = `${item.author.avatar}.png`;

    return card;
  });
  return cards;
};

const appendCards = (cards) => {
  const placeToAppend = document.querySelector('#map-canvas');
  if (cards.length === undefined) {
    placeToAppend.appendChild(cards);
    return;
  }
  cards.forEach((value) => {
    placeToAppend.appendChild(value);
  });
};

const generatedCards = generateCards(generatedData);
appendCards(generatedCards[0]);


