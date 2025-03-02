const request = require('request');
const fs = require('fs');

const geocode = (address, callback) => {
    const geolocationURL = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;
    request({
        url: geolocationURL,
        json: true,
        headers: {
            'Authorization': 'prj_live_sk_b7646b5c32e6f908cb263966f2b1b4361cd88b8a',
        }           
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location details', null);
            console.log(response.body.error);
        } else { 
            const data = response.body;
            fs.writeFileSync('location.json', JSON.stringify(data));
            const { addresses } = data;
            if (addresses?.length) {
                const { latitude, longitude, city } = data.addresses[0];
                callback(null, {
                    latitude,
                    longitude,
                    city,
                });
            } else {
                callback('Unable to find location. Try another search.', null);
            }
        }
    });

};

module.exports = geocode;