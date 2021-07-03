const DEFAULT_FIXED_POINT = 5;
const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.692,
};


const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelectorAll('.map__features');
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

export { formToggle, filterToggle, appendAddressToForm, adForm, DEFAULT_LOCATION };
