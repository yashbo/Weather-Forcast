const request = require('request');
const constants = require('../config');

const weatherData = (address, callback)=> {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("can't fetch data from API", undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("No Such Location Found", undefined)
        }
        else{
            callback(undefined, {
                description: body.weather[0].description,
                temperature: body.main.temp,
                
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;
