const DEFAULT_FIXED_POINT = 5;
const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.692,
};
const PRICE_TYPES = {
  low: 10000,
  high: 50000,
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

const filterByType = (cards,filter,cardValue) => {
  cards = cards.filter((element) => {
    const string = String(element.data.offer[cardValue]);
    return filter.value !== 'any' ? filter.value === string : true;
  });
  return cards;
};

const filterByPrice = (cards,filter,cardValue) => {
  cards = cards.filter((element) => {
    if (filter.value !== 'any') {
      const value = element.data.offer[cardValue];
      if (filter.value === 'middle') { return value >= PRICE_TYPES.low && value <= PRICE_TYPES.high;}
      if (filter.value === 'low') { return value <= PRICE_TYPES.low;}
      if (filter.value === 'high') { return value >= PRICE_TYPES.high;}
    } else {return true;}
  });
  return cards;
};

const filterByFeatures = (cards,features) => {
  features.forEach((feature) => {
    cards = cards.filter((element) => element.data.offer.features !== undefined ? element.data.offer.features.some((value) => value === feature.value) : false);
  });
  return cards;
};

const filterPins = (cards) => {
  let filteredCards = cards;
  const enabledFeatures = new Array;
  mapFeatures.forEach((value) => {
    if (value.checked === true) {
      enabledFeatures.push(value);
    }
  });
  filteredCards = filterByType(filteredCards,filterType,'type');
  filteredCards = filterByPrice(filteredCards,filterPrice,'price');
  filteredCards = filterByType(filteredCards,filterRooms,'rooms');
  filteredCards = filterByType(filteredCards,filterGuests,'guests');
  filteredCards = filterByFeatures(filteredCards,enabledFeatures);
  return filteredCards;
};
export { formToggle, filterToggle, appendAddressToForm, filterPins, mapFilters, adForm, DEFAULT_LOCATION };
