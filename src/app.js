const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')
const app=express()
//console.log(__dirname)
//absolute path

//define paths for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


//setup static directory to serve
app.use(express.static(publicdirectorypath))

//use of hbs to make dynamically changes web pages

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'andrew mead'
    })
})

app.get('/aboutwithhbs',(req,res)=>{
    res.render('aboutwithhbs',{
        title:'about me',
        name:'andrew'
    })
})

app.get('/helpwithhbs',(req,res)=>{
    res.render('helpwithhbs',{
        helpfultext:'this is helpful text',
        title:'help',
        name:'andrew'
    })
})
/*app.get('',(req,res)=>{
    res.send('<h1>weather</h1>')
})
*/
/*
app.get('/help',(req,res)=>{
    res.send([{
        name:'andrew',
        age:27
    },{
        name:'search'
    }
])
})

app.get('/about',(req,res)=>{
    res.send('<h1>about</h1>')
})
*/

/*app.get('/helpwithhbs/*',(req,res)=>{
    res.send('help article not found')
})
*/

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return res.send({error})
       }
       forcast(latitude,longitude,(error,forecastdata)=>{
           if(error)
              return res.send({error})
           
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
       })
    })

/*    console.log(req.query.address)
    res.send({
        forcast:"It is snowing",
        location:'phildaephila',
        address:req.query.address
    })
*/
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/helpwithhbs/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'andrew',
        errormessage:'help article not found'
    })
})


//wildcard character
/*app.get('*',(req,res)=>{
    res.send('My 404 page')
})*/

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'andrew',
        errormessage:'page not found'
    })
})
//app.com
//app.com/help
//app.com/about
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
