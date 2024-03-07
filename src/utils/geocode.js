const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=' + encodeURIComponent(address) +'&maxLocations=1&f=json&token=AAPKefe5e29a3be745d6b76b63d64be7ee58Senkj4vNu0VmGVxBvdSw4wshLDqMTvK7iOwSc1z2cqaiQpYn7AxgydpZM8XDDIoA'
    
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to establish a connection', undefined)
        } else if (body.candidates.length === 0) {
            callback('Cannot find location, try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.candidates[0].location.x,
                latitude: body.candidates[0].location.y,
                location: body.candidates[0].address  
            })
        }

    })
}

module.exports = geocode