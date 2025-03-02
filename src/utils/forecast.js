const request = require('request');
const fs = require('fs');


// const weatherURL = 'http://api.weatherstack.com/current?access_key=46b013edfd2d38b2819964e8b39a7474';

const forecast = (latitude, longitude, callback) => {
    // const weatherURL = 'http://api.weatherstack.com/current?access_key=46b013edfd2d38b2819964e8b39a7474&query=37.8267,-122.4233';
    const weatherURL = `http://api.weatherstack.com/current?access_key=46b013edfd2d38b2819964e8b39a7474&query=${latitude},${longitude}`;

    request({
        url: weatherURL,
        json: true
    }, (error, response) =>{
        if (error) {
            callback('Unable to connect to weather services!', null);
        } else if (response.body.error) {
            callback('Unable to find weather details', null);
        } else {
            const data = response.body;
            const { temperature, feelslike } = data.current;
            fs.writeFileSync('weather.json', JSON.stringify(response));
            fs.writeFileSync('weatherData.json', JSON.stringify(data.current));
            callback(null, `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
        }
    });
};


module.exports = forecast;
