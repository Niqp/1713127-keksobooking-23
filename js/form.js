import { shuffle } from './utils.js';

const DEFAULT_FIXED_POINT = 5;
const CARDS_TO_FILTER = 10;
const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.692,
};
const CARD_FEATURES = {
  any: 'any',
  type: 'type',
  price: 'price',
  rooms: 'rooms',
  guests: 'guests',

};
const PRICE_TYPES = {
  low: 10000,
  high: 50000,
  lowOption: 'low',
  middleOption: 'middle',
  highOption: 'high',
};

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElements = mapFilters.querySelectorAll('.map__filter');
const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRooms = mapFilters.querySelector('#housing-rooms');
const filterGuests = mapFilters.querySelector('#housing-guests');
const mapFeatures = mapFilters.querySelectorAll('.map__checkbox');
const formAddress = adForm.querySelector('#address');


const formToggle = (status) => {
  status = !status;
  adForm.classList.toggle('ad-form--disabled',status);
  adFormElements.forEach((element) => {
    element.disabled = status;
  });
};

const filterToggle = (status) => {
  status = !status;
  mapFilters.classList.toggle('map__filters--disabled',status);
  mapFilterElements.forEach((element) => {
    element.disabled = status;
  });
  mapFeatures.forEach((element) => {
    element.disabled = status;
  });
};

const appendAddressToForm = (evt) => {
  let latLng;
  if (evt) {
    latLng = evt.target.getLatLng();
  } else {
    latLng = DEFAULT_LOCATION;
  }
  const lat = latLng.lat.toFixed(DEFAULT_FIXED_POINT);
  const lng = latLng.lng.toFixed(DEFAULT_FIXED_POINT);
  formAddress.value = `${lat}, ${lng}`;
};

const checkFeature = (card,filter,cardValue) => {
  const string = String(card.data.offer[cardValue]);
  return filter.value === CARD_FEATURES.any || filter.value === string;
};

const checkPrice = (cards,filter,cardValue) => {
  const value = cards.data.offer[cardValue];
  switch(filter.value) {
    case PRICE_TYPES.middleOption: return value >= PRICE_TYPES.low && value <= PRICE_TYPES.high;
    case PRICE_TYPES.lowOption: return value <= PRICE_TYPES.low;
    case PRICE_TYPES.highOption: return value >= PRICE_TYPES.high;
    case CARD_FEATURES.any:
    default: return true;
  }
};

const checkFeatures = (card,features) => {
  const cardFeatures = card.data.offer.features;
  return features.every((feature) => cardFeatures !== undefined && cardFeatures.some((value) => value === feature.value));
};

const filterPins = (cards) => {
  const shuffledCards = cards.slice();
  shuffle(shuffledCards);
  const enabledFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox:checked'));
  const filteredCards = new Array;
  for (let index = 0; index<cards.length; index++) {
    const card = shuffledCards[index];
    if (checkFeature(card,filterType,CARD_FEATURES.type) && checkPrice(card,filterPrice,CARD_FEATURES.price) && checkFeature(card,filterRooms,CARD_FEATURES.rooms)
    && checkFeature(card,filterGuests,CARD_FEATURES.guests) && checkFeatures(card,enabledFeatures)) {
      filteredCards.push(card);
      if (filteredCards.length >= CARDS_TO_FILTER) { return filteredCards; }
    }
  }
  return filteredCards;
};
export { formToggle, filterToggle, appendAddressToForm, filterPins, mapFilters, adForm, DEFAULT_LOCATION };
