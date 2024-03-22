import cities from './data/cities';
import provinces from './data/provinces';

export const getProvices = () => {
  const _provinces = [...provinces];
  _provinces.unshift('');
  return _provinces;
};

export const getCitiesInProvince = (province) => {
  return cities[province];
};
