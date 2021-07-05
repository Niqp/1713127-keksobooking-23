const ALERT_SHOW_TIME = 5000;
const ALERT_ANIMATION_DELAY = 500;
const DEBOUNCE_DELAY = 500;

const getRandomInteger = (min, max) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayItems = (items,itemQuantity,deleteFromOriginal) => {
  if (items.length === 0) {
    return [];
  }

  itemQuantity=Math.abs(itemQuantity);
  const itemsRemaining = items.slice();
  const deleteFromArray = () => {
    const arrayToDeleteFrom =  deleteFromOriginal ? items : itemsRemaining;
    const itemSeed = getRandomInteger(0,arrayToDeleteFrom.length-1);
    const currentItem = arrayToDeleteFrom[itemSeed];
    arrayToDeleteFrom.splice(itemSeed,1);
    return currentItem;
  };

  if (itemQuantity === 1) {
    return [deleteFromArray()];
  }
  itemQuantity = itemQuantity>items.length ? items.length: itemQuantity;
  const data = new Array(itemQuantity).fill(null).map(deleteFromArray);
  return data;
};

const createFetch = (link) => fetch(link)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  });

const createSend = (link,body) => fetch(
  link,
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  });

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.transition = 'all 0.5s';
  alertContainer.style.transform = 'translateY(-100%)';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {alertContainer.style.transform = 'translateY(0)';},ALERT_ANIMATION_DELAY);
  setTimeout(() => {
    alertContainer.style.transform = 'translateY(-100%)';
    setTimeout(() => {alertContainer.remove();},ALERT_ANIMATION_DELAY);
  }, ALERT_SHOW_TIME);
};

const closeCurrentMessage = (messageToClose,form) => {
  let onKeyPress = null;
  let onClick = null;
  const closeMessage = () => {
    messageToClose.remove();
    document.removeEventListener('keydown',onKeyPress);
    document.body.removeEventListener('click',onClick);
  };
  onKeyPress = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  onClick = () => {
    closeMessage();
  };
  if (form) {
    form.reset();
  }
  document.addEventListener('keydown',onKeyPress);
  document.body.addEventListener('click',onClick);
};

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomArrayItems, createFetch, createSend, showAlert, closeCurrentMessage, debounce, DEBOUNCE_DELAY };
