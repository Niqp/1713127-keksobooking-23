const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilterElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelectorAll('.map__features');

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

export {formToggle,adForm};
