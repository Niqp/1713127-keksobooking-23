import {adForm} from './form.js';

const PRICE_PER_TYPE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
}

const ROOMS_CAPACITY = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const disableOptions = (options,values) => {
  options.forEach((option) => {
    if (values.includes(Number(option.value))) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
  });
};

const checkOptionsValidity = (form,values) => {
  if (values.includes(Number(form.value))) {
    form.setCustomValidity('');
  } else {
    form.setCustomValidity('Выберите доступное значение!');
  }
};

const checkPriceValidity = (form,value) => {
  if (value<=form.value) {
    form.setCustomValidity('');
  } else {
    form.setCustomValidity(`Значение должно быть не меньше ${value}!`);
  }
};

const setOptionsValidity = (options,validOptions,formToCheck) => {
  disableOptions(options,validOptions);
  checkOptionsValidity(formToCheck,validOptions);
};

type.addEventListener('change', () => checkPriceValidity(price,PRICE_PER_TYPE[type.value]));
price.addEventListener('change', () => checkPriceValidity(price,PRICE_PER_TYPE[type.value]));

setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity);
rooms.addEventListener('change', () => setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity));
capacity.addEventListener('change', () => checkOptionsValidity(capacity,ROOMS_CAPACITY[rooms.value]));
