import axios from 'axios';

export const postNewVehicle = async (newVehicle) => {
  const response = await axios.post('/api/vehicles/add', newVehicle);
  return response.data.data || [];
};

export const fetchVehicleMakes = async () => {
  const response = await axios.get('/api/vehicles/makes');
  return response.data.data || [];
};

export const fetchVehicleModels = async (makeId) => {
  const response = await axios.get('/api/vehicles/models/' + makeId);
  return response.data.data || [];
};

export const fetchVehicleEngines = async (modelId) => {
  const response = await axios.get('/api/vehicles/engines/' + modelId);
  return response.data.data || [];
};
