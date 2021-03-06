const request=require('request')
const forcast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/4d200a3f759ab5fd8fa6a0609ea003f6/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)       
        }else if(body.error){
            callback('unable to find location.Try another search',undefined)
        }
        else{
           // console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degree out.This high today is "+ body.daily.data[0].temperatureHigh+" with a low of "+body.daily.data[0].temperatureLow + ". There is a "+body.currently.precipIntensity+" % chance of rain")
        }
    })
}
module.exports=forcast
