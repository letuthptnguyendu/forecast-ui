const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request')
const apiKey = '735a3f38f763d8228ddf1c0ad7f8a086'

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

app.post('/', (req, res) => {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, (error, response, body) => {
        if (error) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main === undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' })
            }
            else { 
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    })
})

app.listen(server_port, server_ip_address, () => {
    console.log("......Runing......\n......Port: 3000..\n\n")
})