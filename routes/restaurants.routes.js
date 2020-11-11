const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");

router.get("/", async (req, res) => {
    let restaurants = await Restaurant.find();
    try {
        res.render("restaurants/index", { restaurants });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;