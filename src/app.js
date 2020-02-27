const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getWeather = require('./utils/getWeather');

const app = express();

// Saving paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: '⛈ Weather App',
    name: 'Aman Chaudhary'
  });
})



app.get('/weather', (req, res) => {
  if(!req.query.address) {
     return res.send({error: "You must provide an address."})
  }

  getWeather(req.query.address, (error, data) => {

    if (error) {
      res.send({
        error: error
      })
    } else {
      res.send(data)
    }

  });

  // res.send({
  //   title: 'Weather',
  //   address: req.query.address
  // })

});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "Aman Chaudhary"
  });
});

app.get('/help', (req,res) => {
  res.render('help', {
    title: "Help",
    message: "Here's a dummy help message for testing purposes and testing purposes only",
    name: "Aman Chaudhary"
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'The help article you were looking for, couldn\'nt be found!',
    name: 'Aman Chaudhary'
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'The page you were looking for cannot be found!',
    name: 'Aman Chaudhary'
  })
})



app.listen(3000, () => {
  console.log('The server is up and running...');
})