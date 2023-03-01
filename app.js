//  Include express：
const express = require ('express')  
const app = express()

//  define server related variables：
const port = 3000 

//  require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//  setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine' , 'handlebars')

// setting static files
app.use(express.static('public'))

//  setting the route and corresponding response：
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results});
})

app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
  restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  });
  res.render('index', {restaurants , keyword});
})

app.get('/restaurants/:restaurant_id', (req,res)=>{
  // console.log('restaurants_id', req.params.restaurant_id)
  const restaurant = restaurantList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show',{restaurant: restaurant})
})

//  Listen and start the server：
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})