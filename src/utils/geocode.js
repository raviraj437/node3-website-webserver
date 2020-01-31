const request=require('request')
const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoicmF2aXJhajQzNyIsImEiOiJjazRmdXRia2swcWFmM2ZxcXk2eW9yc2I2In0.cNETcNXllGmw6_T9z8_HiA'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)       
        }else if(body.features.length==0){
            callback('unable to find location.Try another search',undefined)
        }
        else{
            callback(undefined,{
                 latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode
