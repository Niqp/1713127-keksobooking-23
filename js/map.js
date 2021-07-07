import { fetchCards } from './generate-cards.js';
import { DEFAULT_LOCATION, formToggle, filterToggle, appendAddressToForm as onMainPinMove, filterPins, mapFilters }  from './form.js';
import { showAlert, debounce } from './utils.js';

const DEFAULT_MAIN_PIN = {
  size: [52, 52],
  anchor: [26, 52],
  icon: './img/main-pin.svg',
};
const DEFAULT_PIN = {
  size: [40, 40],
  anchor: [20, 40],
  icon: './img/pin.svg',
};
const DEFAULT_MAP = {
  id: 'map-canvas',
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  zoom: 10,
};

const loadMap = () => {
  formToggle(false);
  filterToggle(false);
  const map = L.map(DEFAULT_MAP.id)
    .on('load', () => {
      formToggle(true);
    })
    .setView({
      lat: DEFAULT_LOCATION.lat,
      lng: DEFAULT_LOCATION.lng,
    }, DEFAULT_MAP.zoom);

  L.tileLayer(
    DEFAULT_MAP.tileLayer,
    {
      attribution: DEFAULT_MAP.attribution,
    },
  ).addTo(map);
  return map;
};

const currentMap = loadMap();
let mainPinMarker;

const createMainPin = () => {
  const mainPinIcon = L.icon({
    iconUrl: DEFAULT_MAIN_PIN.icon,
    iconSize: DEFAULT_MAIN_PIN.size,
    iconAnchor: DEFAULT_MAIN_PIN.anchor,
  });

  mainPinMarker = L.marker(
    {
      lat: DEFAULT_LOCATION.lat,
      lng: DEFAULT_LOCATION.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(currentMap);

  mainPinMarker.on('moveend', onMainPinMove);
};

const markerGroup = L.layerGroup().addTo(currentMap);

const createPin = (point,generatedCards) => {
  const {lat, lng} = point.location;
  const icon = L.icon({
    iconUrl: DEFAULT_PIN.icon,
    iconSize: DEFAULT_PIN.size,
    iconAnchor: DEFAULT_PIN.anchor,
  });
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(
      generatedCards,
      {
        keepInView: true,
      },
    );
};

const enablePinFiltering = (generatedCards) => {
  filterToggle(true);

  const generatePins = (currentGeneratedCards) => {
    markerGroup.clearLayers();
    const filteredCards = filterPins(currentGeneratedCards);
    filteredCards.forEach((element) => {
      createPin(element.data,element.html);
    });
  };

  const onFilterChange = debounce(() => {
    generatePins(generatedCards);
  });

  generatePins(generatedCards);
  mapFilters.addEventListener('change',onFilterChange);
};


const resetMainPin = () => {
  mainPinMarker.setLatLng(DEFAULT_LOCATION);
};

createMainPin();

fetchCards()
  .then(enablePinFiltering)
  .catch(() => {
    const errorText = 'Ошибка загрузки обьявлений с сервера!';
    showAlert(errorText);
  });


export { resetMainPin };
