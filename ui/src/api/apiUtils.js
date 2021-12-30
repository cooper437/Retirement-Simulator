/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/**
 * Initialize the port and hostname that axios uses to make external API calls
 */
export const initializeAxiosApiConfigurations = () => {
  const hostName =
    process.env.REACT_APP_API_SERVER_HOSTNAME || window.location.hostname;
  const portNumber =
    process.env.REACT_APP_API_SERVER_PORT || window.location.port;
  if (portNumber) {
    axios.defaults.baseURL = `${window.location.protocol}//${hostName}:${portNumber}`;
  } else {
    axios.defaults.baseURL = `${window.location.protocol}//${hostName}`;
  }
};
