const request = require('request')

const geocode = (address, callback) => {
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FuYXJpZXM4NSIsImEiOiJjazh1MnJqdW0wMHM2M3FrZGZwNGZlZXkwIn0.Z2T4IQXD-RVcexz0wGdcLw&limit=1'
    request({url: geocodeurl, json:true},(error, response) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search',undefined),
            console.log(address)
        }
        else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode