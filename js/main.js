const getRandomInteger = (min, max) => {
  if (min >= max) {
    throw new Error('Ошибка: минимальное значение больше или равно максимальному!');
  }
  if (min<0 || max<0) {
    throw new Error('Ошибка: отрицательные значения не принимаются!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, precision) => {
  if (min >= max) {
    throw new Error('Ошибка: минимальное значение больше или равно максимальному!');
  }
  if (min<0 || max<0) {
    throw new Error('Ошибка: отрицательные значения не принимаются!');
  }
  return parseFloat(Math.random().toFixed(precision)) * (max - min) + min;;
};

const randomInteger = getRandomInteger(2,5);
const randomFloat = getRandomFloat(1.1,1.2,2);
