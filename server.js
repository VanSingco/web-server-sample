const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now =  new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        title: 'The Site is on Maintenace mode we will back soon!'
    });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})


app.get('/', (req, res) => {
    // res.send('Hello NodeJS')
    res.render('home.hbs', {
        title: 'Welcome Home'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
        author: 'Van Zachary Singco'
    })
});

app.listen(3000);