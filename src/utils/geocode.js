const request = require('request');

const geocode = (address, callback) => {
  const accessToken = 'pk.eyJ1IjoiYW1hbmZyb21zb2xhbiIsImEiOiJjanplM3hqeHQwNnRuM2JwaGRranRmczN2In0.Jxt83Rfath-BlpndgdaiIw';
  const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`;

  request({url: geocodingURL, json: true}, (error, response) => {

    if (error) {
        callback('Unable to connect to the server!', undefined)
    } else if (response.body.features.length <= 0) {
        callback("We couldn't find anything with that name. Check your spelling, or try a different name!", undefined)
    } else {
        const data = response.body.features[0];
        const longitude = data.geometry.coordinates[0];
        const latitude = data.geometry.coordinates[1];
        const locationName = data.place_name;
  
        callback(undefined, {
          longitude, 
          latitude, 
          locationName
        });
    }
  });

}

module.exports = geocode;