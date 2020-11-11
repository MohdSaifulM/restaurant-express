const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");

router.get("/:id", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id)
        res.render("restaurants/show", { restaurant });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;