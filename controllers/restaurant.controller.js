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

