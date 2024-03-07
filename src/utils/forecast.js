const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + latitude + ',' + longitude + '?unitGroup=metric&key=58ZRMFEBLDNU5W6MPEWH9FWTP&contentType=json'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Cannot connect to weather app', undefined)
        } else if (body.error) {
            callback('An error has occurred', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currentConditions.temp + ' degrees out. It feels like ' + body.currentConditions.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast