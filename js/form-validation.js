import { adForm } from './form.js';
import { createSend, closeCurrentMessage } from './utils.js';
import { resetMainPin } from './map.js';

const FORM_SERVER = 'https://23.javascript.pages.academy/keksobooking';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


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

const resetButton = document.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const fileChooser = adForm.querySelector('.ad-form-header__input');
const preview = document.querySelector('.ad-form-header__preview img');

const onAvatarChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    const onReaderLoad = () => {
      preview.src = reader.result;
      reader.removeEventListener('load', onReaderLoad);
    };
    reader.addEventListener('load', onReaderLoad);
    reader.readAsDataURL(file);
  }
};

fileChooser.addEventListener('change', onAvatarChange);

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

resetButton.addEventListener('click',() => {
  resetMainPin();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(adForm);
  createSend(FORM_SERVER,formData)
    .then(() => {
      let message = successTemplate.cloneNode(true);
      document.body.append(message);
      message = document.querySelector('.success');
      resetMainPin();
      closeCurrentMessage(message,adForm);
    })
    .catch (() => {
      let message = errorTemplate.cloneNode(true);
      document.body.append(message);
      message = document.querySelector('.error');
      closeCurrentMessage(message);
    });
});
