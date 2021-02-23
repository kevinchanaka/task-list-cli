const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {'Content-type': 'application/json'},
});

module.exports = {
  NAME_LENGTH: 30,
  DESCRIPTION_LENGTH: 120,
  NUM_SPACES: 4,
  axios: instance,
};
