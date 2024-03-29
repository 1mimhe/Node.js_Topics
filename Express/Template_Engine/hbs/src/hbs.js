const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs'); // for customize partials directory
const blogs = require('../blogs.json');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setting up templating engine
app.set('view engine', 'hbs'); // we tell Express which templating engine we install.
// customizing the views and partials directory
app.set('views', viewsPath); // default => in root, in 'views' folder.
hbs.registerPartials(partialsPath);

// render a view
app.get('/', (req, res) => {
    // just the name of .hbs file we create in 'views' folder.
    // values we provide to template.
    res.render('index', {
        title: 'Weather App',
        name: 'Mammad',
        blogs
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mammad'
    });
});

app.listen(3000, () => console.log(`Listening to port 3000...`));