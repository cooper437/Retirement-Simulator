/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const submitRetirementSimulationForm = async ({ formParams }) => {
  const requestPayload = {
    ...formParams
  };
  try {
    const response = await axios.post('/simulate', requestPayload);
    return response.data;
  } catch (err) {
    console.error('An error occured');
    return null;
  }
};
