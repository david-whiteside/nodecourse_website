const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const weatherurl  = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b9c5ebdbc446ecbf28f1a21d3d700dcf'
    request({ url: weatherurl, json: true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error){ 
            callback('Unable to find location for weather, try another search',undefined)
        } else {
            callback(undefined,'The weather is ' + body.weather[0].description + '. The temperature is ' + body.main.temp + 'c. It feels like ' + body.main.feels_like + 'c.')
        }
    }
)}

module.exports = forecast