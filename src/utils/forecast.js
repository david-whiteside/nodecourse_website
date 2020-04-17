const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const weatherurl  = 'http://api.weatherstack.com/current?access_key=b26750644c04dcc75363b7bcbab6c7c6&query=' + latitude + ',' +  longitude
    request({ url: weatherurl, json: true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error){ 
            callback('Unable to find location for weather, try another search',undefined)
        } else {
            callback(undefined,body.current.weather_description[0] + '. The temperature is ' + body.current.temperature + 'c. It feels like ' + body.current.feelslike + 'c.')
        }
    })}

module.exports = forecast