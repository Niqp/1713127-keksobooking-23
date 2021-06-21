const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelectorAll('.map__features');

const makeFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilterElements.forEach((element) => {
    element.disabled = true;
  });
  mapFeatures.forEach((element) => {
    element.disabled = true;
  });

};

const makeFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = false;
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((element) => {
    element.disabled = false;
  });
  mapFeatures.forEach((element) => {
    element.disabled = false;
  });
};

export {makeFormActive,makeFormInactive};
