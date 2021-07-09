import { adForm, mapFilters } from './form.js';
import { createSend, closeCurrentMessage } from './utils.js';
import { resetMainPin } from './map.js';

const FORM_SERVER = 'https://23.javascript.pages.academy/keksobooking';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const TITLE_MIN_LENGTH = 30;

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

const adFormElements = adForm.querySelectorAll('.ad-form__element input, .ad-form__element select');

const title = adForm.querySelector('#title');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const priceDefault = price.placeholder;

const avatarChooser = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const avatarDefaultPreview = avatarPreview.src;
const formPhotoChooser = adForm.querySelector('.ad-form__input');
const formPhotoContainer = adForm.querySelector('.ad-form__photo');

formPhotoContainer.style.display = 'flex';
formPhotoContainer.style.alignItems = 'center';
formPhotoContainer.style.justifyContent = 'center';
const formPhotoPreview = document.createElement('img');
formPhotoPreview.alt = 'Фотография жилья';
formPhotoPreview.width = '40';
formPhotoPreview.height = '44';
formPhotoPreview.src = avatarDefaultPreview;
formPhotoContainer.append(formPhotoPreview);


const changePicture = (chooser,preview) => {
  const file = chooser.files[0];
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

const onAvatarChange = () => {
  changePicture(avatarChooser,avatarPreview);
};

const onFormPhotoChange = () => {
  changePicture(formPhotoChooser,formPhotoPreview,true);
};

avatarChooser.addEventListener('change', onAvatarChange);
formPhotoChooser.addEventListener('change', onFormPhotoChange);

const disableOptions = (options,values) => {
  options.forEach((option) => {
    option.disabled = !(values.includes(Number(option.value)));
  });
};


const checkOptionsValidity = (form,values) => {
  const check = values.includes(Number(form.value));
  check ? form.style.border = '' : form.style.border = '2px solid red';
  form.setCustomValidity( check ? '' : 'Выберите доступное значение!');
};

const checkLengthValidity = (form,value) => {
  const check = value<=form.value.length;
  check ? form.style.border = '' : form.style.border = '2px solid red';
  form.setCustomValidity(check ? '' : `Длина текста должна быть не меньше ${value}!`);
};

const checkNumberValidity = (form,value) => {
  form.placeholder = value;
  const check = value<=Number(form.value);
  check ? form.style.border = '' : form.style.border = '2px solid red';
  form.setCustomValidity(check ? '' : `Значение должно быть не меньше ${value}!`);
};

const setOptionsValidity = (options,validOptions,formToCheck) => {
  disableOptions(options,validOptions);
  checkOptionsValidity(formToCheck,validOptions);
};

const setSameValue = (changedForm, formToSet) => {
  formToSet.value = changedForm.value;
};

title.addEventListener('change', () => checkLengthValidity(title,TITLE_MIN_LENGTH));
type.addEventListener('change', () => checkNumberValidity(price,PRICE_PER_TYPE[type.value]));
price.addEventListener('change', () => checkNumberValidity(price,PRICE_PER_TYPE[type.value]));

timein.addEventListener('change', () => setSameValue(timein,timeout));
timeout.addEventListener('change', () => setSameValue(timeout,timein));

setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity);
rooms.addEventListener('change', () => setOptionsValidity(capacityOptions,ROOMS_CAPACITY[rooms.value],capacity));
capacity.addEventListener('change', () => checkOptionsValidity(capacity,ROOMS_CAPACITY[rooms.value]));

const resetForm = () => {
  resetMainPin();
  mapFilters.reset();
  price.placeholder = priceDefault;
  adFormElements.forEach((element) => element.style.border = '');
  avatarPreview.src = avatarDefaultPreview;
  formPhotoPreview.src = avatarDefaultPreview;
};

resetButton.addEventListener('click',() => {
  resetForm();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(adForm);
  createSend(FORM_SERVER,formData)
    .then(() => {
      const message = successTemplate.cloneNode(true).querySelector('.success');
      document.body.append(message);

      resetForm();
      closeCurrentMessage(message,adForm);
    })
    .catch (() => {
      const message = errorTemplate.cloneNode(true).querySelector('.error');
      document.body.append(message);
      const button = message.querySelector('.error__button');
      closeCurrentMessage(message,false,button);
    });
});
