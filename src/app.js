const path = require('path')
const express = require('express')
const hbs = require('hbs')



const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setun handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hans Zijlstra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hans Zijlstra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Hans Zijlstra',
        message: 'Ask me a question and I help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        }
            forecast(latitude, longitude, (error, forecastData) => {
            
            if (error) {
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
} )

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Hans Zijlstra',
        errorMessage: 'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hans Zijlstra',
        errorMessage: 'My 404 page'})
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})