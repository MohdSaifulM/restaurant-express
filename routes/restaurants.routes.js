const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");
const Cuisine = require("../models/cuisine.model");

router.get("/", async (req, res) => {
    let restaurants = await Restaurant.find();
    let cuisines = await Cuisine.find();
    try {
        res.render("restaurants/index", { restaurants, cuisines });
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    try {
        let restaurantData = {
            name: req.body.name,
            owner: req.body.owner,
            location: req.body.location,
            cuisine: req.body.cuisines,
        };
        //restaurant saved
        let restaurant = new Restaurant(restaurantData);
        await restaurant.save();        

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;