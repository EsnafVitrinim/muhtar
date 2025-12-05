// api.js
const API_URL = 'https://turkiyeapi.dev/api/v1';

export const fetchProvinces = async () => {
  try {
    const response = await fetch(`${API_URL}/provinces`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

export const fetchDistricts = async (provinceId) => {
  try {
    const response = await fetch(`${API_URL}/provinces/${provinceId}`);
    const data = await response.json();
    return data.data.districts || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

export const fetchNeighborhoods = async (districtId) => {
  try {
    const response = await fetch(`${API_URL}/districts/${districtId}`);
    const data = await response.json();
    return data.data.neighborhoods || [];
  } catch (error) {
    console.error('Error fetching neighborhoods:', error);
    return [];
  }
};
