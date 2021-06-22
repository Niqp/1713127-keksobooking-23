import {adForm} from './form.js';

const PRICE_PER_TYPE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};

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
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const disableOptions = (options,values) => {
  options.forEach((option) => {
    option.disabled = !(values.includes(Number(option.value)));
  });
};

const checkOptionsValidity = (form,values) => {
  form.setCustomValidity(values.includes(Number(form.value)) ? '' : 'Выберите доступное значение!');
};

const checkPriceValidity = (form,value) => {
  form.placeholder = value;
  form.setCustomValidity(value<=Number(form.value) ? '' : `Значение должно быть не меньше ${value}!`);
};

const setOptionsValidity = (options,validOptions,formToCheck) => {
  disableOptions(options,validOptions);
  checkOptionsValidity(formToCheck,validOptions);
};

const setSameValue = (changedForm, formToSet) => {
  formToSet.value = changedForm.value;
};

type.addEventListener('change', () => checkPriceValidity(price,PRICE_PER_TYPE[type.value]));
price.addEventListener('change', () => checkPriceValidity(price,PRICE_PER_TYPE[type.value]));

timein.addEventListener('change', () => setSameValue(timein,timeout));
timeout.addEventListener('change', () => setSameValue(timeout,timein));

setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity);
rooms.addEventListener('change', () => setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity));
capacity.addEventListener('change', () => checkOptionsValidity(capacity,ROOMS_CAPACITY[rooms.value]));
