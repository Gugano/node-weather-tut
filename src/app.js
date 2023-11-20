const path = require('node:path');
const express = require('express') 
var hbs = require('hbs');
const {coordinates, forecast} = require('./utils/geocode')



const app = express()
const port = 3000

//set path to static content
pathToPublicDirectory = path.join(__dirname, '../public')
pathTiViews = path.join(__dirname, '../templates/views')

app.use(express.static(pathToPublicDirectory))

//set up handlebars engine and views location
app.set('view engine', 'hbs') // expects folder views in the rooot
app.set('views', pathTiViews)

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//app get decides what server should when someon calls this route
//send for static , render for dynamic content
app.get('', (req, res) => {  
  console.log(`This is response from req : ${req}`)
  res.render('index', {
    message: "THis is server from static file",
    name : "Ogi"  
  }) 
})

app.get('/help', (req, res) => {  
  res.render('help', {
    help: "Help page coming soon",
    name : "Ogi" 
  }) 
})

app.get('/about', (req, res) => {  
  res.render('about', {
    msg: "More information later",
    date : "2008-2023",
    name : "Ogi"  
  }) 
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
      return res.send("Address must be provided")
    }

    coordinates(req.query.address, (err, place) => {
        if(!err){
            forecast(place, (err, temp) => {
              res.send({
                "place" : place.name,
                "temperature" : temp
              })
            })
        } else {
           res.send(`Could not find place ${place}`)
        }
        
    })
  /*   res.send({
        "location": req.query.address,
        "TEmperature": 27,
        name : "Ogi"  
    }) */
})

app.get('/index', (req, res) => {
  res.render('index', {
    message: "THis is server from static file",
    name : "Ogi"  
  }) 
})

app.get('/help/*', (req, res) => {  
  res.render('nonExistingPage',{
    msg : "help article  not found"
  }) 
})
  app

app.get('*', (req, res) => {  
  res.render('nonExistingPage',{
    msg : "page not found"
  }) 
})
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
