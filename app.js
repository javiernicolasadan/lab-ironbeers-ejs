const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  /* try {
    let beers = await punkAPI.getBeers()    
    res.render("beers", {beers})
    
  } catch (error) {
    console.log(error)
  } */
  punkAPI.getBeers()
  .then(beersFromApi => res.render("beers", {beersFromApi}))
  
  
});

app.get('/random-beer', async (req, res) => {
  try {
    let randomBeer = await punkAPI.getRandom()    
    //console.log("random-beer", randomBeer)
    res.render("random-beer", {randomBeer})
    
  } catch (error) {
    console.log(error)
  }
});

 app.get("/beerDetails/:id", async (req, res) => {
  try {
    let id = req.params.id
    
    let beerDetailsFromApi = await punkAPI.getBeer(id) 
    res.render("beerDetails", {beerDetailsFromApi})
    
  } catch (error) {
    console.log(error)
  }
}) 


app.listen(3000, () => console.log('🏃‍ on port 3000'));
