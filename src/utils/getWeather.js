const geocode = require('./geocode');
const forecast = require('./forecast');


const getWeather = (locationName, callback) => {

  geocode(locationName, (error, geocodeData) => {
    if (error) {
      return callback(error, undefined); 
    }
    const {longitude, latitude, locationName} = geocodeData;
    
    //Error returns 'Unable to connect to the server!' when no internet, or 
    // 'Looks like we couldn't find anything with that name. Try a different Search result' when can't find location
  
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {callback(error, undefined)}
      else {
        const {temperature, precipProbability, forecast} = forecastData;
        callback(undefined, {
          location: locationName,
          temperature,
          precipProbability,
          forecast
        })
      } 
    })
  });

}

module.exports = getWeather;