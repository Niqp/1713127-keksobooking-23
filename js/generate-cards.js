import { generateRandomData } from './generate-random-data.js';
const CARD_TEMPLATE = document.querySelector('#card').content;
const CARD_POPUP = CARD_TEMPLATE.querySelector('.popup');
const PLACE_TO_APPEND = document.querySelector('#map-canvas');
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

const generateCards = (data) => {
  const cards = data.map((item) => {
    const card = CARD_POPUP.cloneNode(true);
    replaceText(card,'.popup__title',item.offer.title);
    replaceText(card,'.popup__text--address',item.offer.address);
    replaceText(card,'.popup__text--price',`${item.offer.price} ₽/ночь`);
    replaceText(card,'.popup__type',FLAT_TYPES_TEXT[item.offer.type]);
    replaceText(card,'.popup__text--capacity',`${item.offer.rooms} комнаты для ${item.offer.guests} гостей.`);
    replaceText(card,'.popup__text--time',`Заезд после ${item.offer.checkin}, выезд после ${item.offer.checkout}`);
    replaceText(card,'.popup__description',item.offer.description);
    const avatar = card.querySelector('.popup__avatar');
    avatar.src = `${item.author.avatar}.png`;

    const replacePhotos = () => {
      const photos = card.querySelector('.popup__photos');
      const photo = card.querySelector('.popup__photo');
      photo.remove();
      if (item.offer.photos.length === 0) {
        photos.remove();
        return;
      }
      item.offer.photos.forEach((value) => {
        const currentPhoto = photo.cloneNode(true);
        currentPhoto.src = value;
        photos.appendChild(currentPhoto);
      });
    };

    replacePhotos();

    const replaceFeatures = () => {
      const featureClasses = item.offer.features.map((feature) => `popup__feature--${feature}`);
      const featureList = card.querySelectorAll('.popup__feature');
      if (featureClasses.length === 0) {
        const featureBlock = card.querySelector('.popup__features');
        featureBlock.remove();
        return;
      }
      featureList.forEach((feature) => {
        const modifier = feature.classList[1];
        if (!featureClasses.includes(modifier)) {
          feature.remove();
        }
      });
    };

    replaceFeatures();

    return card;
  });
  return cards;
};

const appendCards = (cards) => {
  if (cards.length === undefined) {
    PLACE_TO_APPEND.appendChild(cards);
    return;
  }
  cards.forEach((value) => {
    PLACE_TO_APPEND.appendChild(value);
  });
};

const generatedCards = generateCards(generatedData);
appendCards(generatedCards[0]);


