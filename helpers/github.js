const axios = require('axios');
const config = require('../config.js');
const path = require('path');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: path.join('https://api.github.com/users/', username, 'repos'),
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options)
    .then((response) => {
      console.log('successfully returning response');
      callback(null, response);
    })
    .catch((error) => {
      console.log('returning error');
      callback(error.response);
    })
}

module.exports.getReposByUsername = getReposByUsername;