const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const weatherurl  = 'http://api.weatherstack.com/current?access_key=e979abab9c9531d7517d4aa0e4922074&query=' + latitude + ',' +  longitude
    request({ url: weatherurl, json: true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error){ 
            callback('Unable to find location, try another search',undefined)
        } else {
            callback(undefined,'The temperature is ' + body.current.temperature + 'c. It feels like ' + body.current.feelslike + 'c.')
        }
    })}

module.exports = forecast