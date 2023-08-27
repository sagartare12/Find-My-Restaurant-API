const restaurantController = require('../controllers/restaurant.controller')

module.exports =(app)=>{
    app.post('/api/restaurant/add',restaurantController.addRestaurant);
    app.get('/api/restaurant',restaurantController.getRestaurants);
    app.get('/api/restaurant/categories',restaurantController.getRestaurantCategory);
    app.get('/api/restaurant/categories/:category',restaurantController.getRestaurantsByCategoryName);
    app.get('/api/restaurant/:id',restaurantController. getRestaurantById);
    // app.get('/api/restaurant/rating/:rating', restaurantController.getRestaurantsByRating);
    app.get(
        "/api/restaurant/rating/:rating",
        restaurantController.getRestaurantsByRating
      );
    app.put('/api/restaurant/:id', restaurantController.updateRestaurant);
    app.delete('/api/restaurant/:id', restaurantController.deleteRestaurant);
    app.delete('/api/restaurant', restaurantController.deleteRestaurants);
}
