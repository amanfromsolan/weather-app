const request = require('request');


const forecast = (longitude, latitude, callback) => {
  const unit = 'ca';
  const apiToken = '7a458716d51556b699b5a9b98976da91';
  const weatherAPI = `https://api.darksky.net/forecast/${apiToken}/${latitude},${longitude}?units=${unit}`;

  request({url: weatherAPI, json: true}, (error, response) => {
      if (error) {
        callback('Unable to connect to server!', undefined)
    } else if (response.body.error) {
        callback('Invalid input!', undefined)
    } else {
      const currentWeather = response.body.currently;
      const { summary, temperature, precipProbability } = currentWeather;

      callback(undefined, {
        temperature: temperature,
        precipProbability: precipProbability,
        forecast: `The current temperature is ${temperature}. There is a ${precipProbability}% chance of rain`
      });
    }
  })
};

module.exports = forecast;