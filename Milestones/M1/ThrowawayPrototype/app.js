var express = require('express');
var app = express();
const port = 8080;

var handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/posts", require("./route/postRoutes"));

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
    defaultLayout: 'home'
}));

app.use(express.static('views/layouts'));

app.use(express.static('views/partials'));

app.get('/', (req, res) => {
    res.render('partials/main');
});

app.get('/about', (req, res) => {
    res.render('partials/about');
});

app.get('/devAbout', (req, res) => {
    res.render('partials/devAbout');
});

app.get('/issaAbout', (req, res) => {
    res.render('partials/issaAbout');
});

app.get('/youssefAbout', (req, res) => {
    res.render('partials/youssefAbout');
});

app.get('/tungAbout', (req, res) => {
    res.render('partials/tungAbout');
});

app.get('/praiseAbout', (req, res) => {
    res.render('partials/praiseAbout');
});

app.get('/ricardoAbout', (req, res) => {
    res.render('partials/ricardoAbout');
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});

