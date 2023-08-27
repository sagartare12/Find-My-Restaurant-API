const Restaurant = require('../models/restaurant.model')

exports.addRestaurant=async(req,res)=>{
    try{
    const { name, description, category, imageURL, location, phone, rating } = req.body;
    if (!name || !description || !category || !imageURL || !location || !phone || !rating) return res.status(500).json({
      message: "Content cannot be empty"
    })

    

    const restaurantCreate = await Restaurant.create({
        name, 
        description, 
        category, 
        imageURL, 
        location, 
        phone, 
        rating,
       
    });
   
    res.status(200).json(restaurantCreate );

}catch(err){
    console.log(err)
    res.status(500).json({
        message:'Some error occurred while creating the Restaurant'
    })
}
}

exports.getRestaurants = async(req,res)=>{
            const restaurants = await Restaurant.find();
            console.log(restaurants)
            res.status(200).json({
                restaurants,
                message:'Restaurants fetched successfully.'
});
}

exports.getRestaurantCategory=async(req,res)=>{
    try{
    const restaurants = await Restaurant.distinct("category");
    console.log(restaurants)
    res.status(200).json({
        restaurants,
        
});
}catch(err){
    console.log(err)
    res.status(500).json({
        message:'Some error occurred while getting the Restaurant'
    })
}
}

exports.getRestaurantsByCategoryName = async (req, res) => {
  try {
    const { category } = req.params;
    const restuarants = await Restaurant.find({ category });
    res.status(200).json(restuarants);
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant."
    });
  }
}

exports.getRestaurantById = async (req, res) => {
    try {
      // This API returns details of the restaurant with a particular id.
      const { id } = req.params;
      const restaurant = await Restaurant.findById(id);
  
      if (!restaurant) return res.status(404).send({
        message: "No Restaurant found with the given ID"
      })
  
      res.status(200).send(restaurant);
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "Some error occured while fetching the Restaurant."
      });
    }
  }

//   exports.getRestaurantsByRating = async (req, res) => {
//     try {
//       // This API returns details of all the restaurants with ratings greater than equal to the given rating.
//       const { rating } = req.params;
//       const restaurants = await Restaurant.find({ rating: { $gte: parseFloat(rating) } });
  
//       res.status(200).send(restaurants);
//     } catch (error) {
//       res.status(500).send({
//         message: "Some error occured while fetching the Restaurant."
//       });
//     }
//   }
exports.getRestaurantsByRating = async (req, res) => {
    try {
      const rating = req.params.rating;
      const restaurants = await Restaurant.find({
        rating: { $gte: parseFloat(rating) },
      });
  
      res.status(200).send(restaurants);
    } catch (error) {
      res.status(500).send({
        message: "Some error occured while fetching the Restaurant",
      });
    }
  };
  
  // PUT
  
  exports.updateRestaurant = async (req, res) => {
    try {
      // This API updates existing details of the restaurant with a particular id.
      if (!req.body) return res.status(400).send({ message: "Restaurant Data is required" });
  
      const { id } = req.params;
      const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);
      if (!restaurant) return res.status(200).send({ message: "No Restaurant found for given ID" });
  
      res.status(200).send({ message: "Restaurant updated successfully." })
    } catch (error) {
      res.status(500).send({
        message: "Some error occured while fetching the Restaurant."
      });
    }
  }
  
  // DELETE
  
  exports.deleteRestaurant = async (req, res) => {
    try {
      // This API updates existing details of the restaurant with a particular id.
      const { id } = req.params;
      const restaurant = await Restaurant.findByIdAndDelete(id);
  
      res.status(200).send({
        restaurant,
        message: "Restaurant deleted successfully."
      })
    } catch (error) {
      res.status(500).send({
        message: "Some error occured while deleting the Restaurant."
      });
    }
  }
  
  exports.deleteRestaurants = async (req, res) => {
    try {
      // This API updates existing details of the restaurant with a particular id.
      const deletionResult = await Restaurant.deleteMany({}); // Delete all restaurants
  
      if (deletionResult.deletedCount === 0) {
        return res.status(200).send({ restaurants: null, message: "No restaurants deleted." });
      }
  
      res.status(200).send({
        restaurants: {
          acknowledged: deletionResult.acknowledged,
          deletedCount: deletionResult.deletedCount,
        },
        message: "Restaurants deleted successfully.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Some error occured while deleting the Restaurant."
      });
    }
  }

