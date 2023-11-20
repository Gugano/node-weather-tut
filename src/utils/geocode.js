const requests = require('request')

const coordinates = (place, callback) => {
    const positionStack_url = 'http://api.positionstack.com/v1/forward?access_key=a6e94ab3b3d4d75481ba68f437d3d87a&query='

    requests(`${positionStack_url}${encodeURI(place)}`, (err, res, body) => {
        if(err){
            callback('cannot connect to service, please check your internet connection', undefined)
        }
        else if(JSON.parse(body).data.length === 0){
            callback(`Location ${place} does no seem to exist, please try anothere location`, undefined)
        }
        else{
            responeBody = JSON.parse(body)
            loc = {
                lon : responeBody.data[0]['longitude'], 
                lat : responeBody.data[0]['latitude'],
                name : responeBody.data[0]['county'] + ', ' + responeBody.data[0]['name']
        }
        callback(undefined, loc)
        }
    })
}

const forecast = ({lon, lat}, callback) => {
    const url2 = 'http://api.weatherstack.com/current?access_key=3c99a4103e1f6e5397c39fdba746e27c&query=';
    tempUrl = `${url2}${lat},${lon}`
    console.log(tempUrl)
    requests(tempUrl, (err, res, body) => {
        bodyContent = JSON.parse(body)
        console.log(bodyContent['current']['temperature'])
        callback(undefined, bodyContent['current']['temperature'])
    })
}

module.exports = {
    coordinates, 
    forecast
}
