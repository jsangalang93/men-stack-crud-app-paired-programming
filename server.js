const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const methodOverride = require('method-override');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,)

const Car = require('./models/car');

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
res.render('home.ejs');
})

// --------------------------CREATE ROUTE--------------------------
app.get("/cars/new", (req, res) => {
    res.render('cars/new.ejs');
})

app.post('/cars', async (req, res) => {
    console.log(req.body);
    // const postedCars = 
    await Car.create(req.body);
    res.redirect('/cars');
})
// --------------------------END CREATE ROUTE--------------------------

// -----------------------------READ ROUTE------------------------------

app.get('/cars', async (req, res) => {
        const allCars = await Car.find();
        console.log(allCars);
    res.render('cars/index.ejs', {cars: allCars});
})

app.get('/cars/:id', async (req, res) => {
    const foundCar = await Car.findById(req.params.id);
    res.render('cars/show.ejs', {car: foundCar});
})

// -----------------------------END READ ROUTE-----------------------------

// ------------------------------DELETE ROUTE------------------------------

app.delete('/cars/:id', async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect("/cars");
})

// ---------------------------END DELETE ROUTE------------------------------

// --------------------------------UPDATE ROUTE-----------------------------

app.get('/cars/:id/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.id);
    res.render('cars/edit.ejs', {car: foundCar});
})

app.put('/cars/:id', async (req, res) => {
    await Car.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect(`/cars/${req.params.id}`);
})

// ----------------------------END UPDATE ROUTE-----------------------------












// ------------------------------END EDIT ROUTE-----------------------------

app.listen(3012, () => {
    console.log('listening on 3012');
})