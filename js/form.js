import { createSend } from './utils.js';

const DEFAULT_FIXED_POINT = 5;
const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.692,
};
const FORM_SERVER = 'https://23.javascript.pages.academy/keksobooking';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelectorAll('.map__features');
const formAddress = adForm.querySelector('#address');
const formReset = adForm.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const formToggle = (status) => {
  status = !status;
  adForm.classList.toggle('ad-form--disabled',status);
  adFormElements.forEach((element) => {
    element.disabled = status;
  });
  mapFilters.classList.toggle('map__filters--disabled',status);
  mapFilterElements.forEach((element) => {
    element.disabled = status;
  });
  mapFeatures.forEach((element) => {
    element.disabled = status;
  });
};

const appendAddressToForm = (evt) => {
  let lat;
  let lng;
  if (evt) {
    const latLng = evt.target.getLatLng();
    lat = latLng.lat.toFixed(DEFAULT_FIXED_POINT);
    lng = latLng.lng.toFixed(DEFAULT_FIXED_POINT);
  } else {
    lat = DEFAULT_LOCATION.lat.toFixed(DEFAULT_FIXED_POINT);
    lng = DEFAULT_LOCATION.lng.toFixed(DEFAULT_FIXED_POINT);
  }
  formAddress.value = `${lat}, ${lng}`;
};

formReset.addEventListener('click',() => {
  adForm.reset();
  appendAddressToForm();
});

const buttonReset = (form,button,message) => {
  form.reset();
  appendAddressToForm();
  button.removeEventListener('click',buttonReset);
  message.remove();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(adForm);
  createSend(FORM_SERVER,formData)
    .then(() => {
      const message = successTemplate.cloneNode(true);
      document.body.append(message);
    })
    .catch (() => {
      const message = errorTemplate.cloneNode(true);
      const errorButton = message.querySelector('.error__button');
      document.body.append(message);
      errorButton.addEventListener('click',() => {
        buttonReset(adForm,errorButton,message);
      });
    });
});


appendAddressToForm();
export {formToggle,appendAddressToForm,adForm,DEFAULT_LOCATION};
