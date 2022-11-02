var express = require('express');
var app = express();
const port = 8080;

const path = require('path');

var handlebars = require('express-handlebars');
const exp = require('constants');

app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use('/', require("./route/routeIndex"));

// Redirect requests to endpoint starting with /registered to registeredRoutes.js
app.use("/users", require("./route/userRoutes"));

// Redirect requests to endpoint starting with /registered to registeredRoutes.js
app.use("/listings", require("./route/listingRoutes"));

app.use(express.static((path.join(__dirname, "js"))));

app.use(express.static('model'));

app.use("/public", express.static(path.join(__dirname, 'public')));

// Global Error Handler. Important function params must start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went wrong",
    });
})

app.engine('handlebars', handlebars.engine({
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: 'handlebars',
    defaultLayout: 'home',
    helpers: {
        emptyObject: (obj) => { //for flash messages
            return !(obj.constructor === Object && Object.keys(obj).length == 0);
        }
        /**
         * if you need more helpers, add them here
         * key, value
         * value is a function
         */
    }
}));

//app.use(express.static('views/layouts'));

//app.use(express.static('views/partials'));

app.use(express.static('views'));

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => {
    res.render('about/about');
});

app.get('/loginpage', (req, res) => {
    res.render('loginpage');
});

app.get('/helppage', (req, res) => {
    res.render('helppage');
});

app.get('/devAbout', (req, res) => {
    res.render('about/devAbout');
});

app.get('/issaAbout', (req, res) => {
    res.render('about/issaAbout');
});

app.get('/youssefAbout', (req, res) => {
    res.render('about/youssefAbout');
});

app.get('/tungAbout', (req, res) => {
    res.render('about/tungAbout');
});

app.get('/praiseAbout', (req, res) => {
    res.render('about/praiseAbout');
});

app.get('/ricardoAbout', (req, res) => {
    res.render('about/ricardoAbout');
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});