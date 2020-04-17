const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'David Whiteside'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About David',
        name: 'David Whiteside'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'David Whiteside'
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send (error)
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        }
    )}
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 404,
        errorMessage: 'Help article not found',
        name: 'David Whiteside'
    })
    }
)

app.get('*',(req,res) => {
    res.render('404',{
        title: 404,
        errorMessage: 'Page not found',
        name: 'David Whiteside'
    })
    }
)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})