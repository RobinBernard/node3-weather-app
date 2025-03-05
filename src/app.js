const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { error } = require('console');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

console.log('viewsPath', viewsPath);
console.log('partialsPath', partialsPath);
console.log('publicDirectoryPath', publicDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead',
        message: 'This is Weather Applikation. Use this site to get your weather!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
        imgPath: "/assets/picture.jpg",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead',
        helpText: 'This is some helpful page.'
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }
    console.log(req.query);

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        // forecast('37.8267', '-122.4233', (error, data) => {
        const { latitude, longitude, city } = data;
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: city,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Weather!</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Andrew',
//             age: 33
//         },{
//             name: 'Mead',
//             age: 27
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1> About Page </h1>');
// });

// app.com
// app.com/help
// app.com/about
// app.com/weather

