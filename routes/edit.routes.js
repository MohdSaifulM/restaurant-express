const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");

router.get("/:id", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        res.render("restaurants/edit", { restaurant });
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", (req, res) => {
    let { name, location, cuisineData, owner } = req.body;
    let cuisine = cuisineData.split(",");
    let data = {
        name,
        location,
        cuisine,
        owner,
    };
    Restaurant.findByIdAndUpdate(req.params.id, data).then((success) => {
        res.redirect(`/show/${req.params.id}`);
    }).catch((error) => {
        console.log(error);
    })
})

module.exports = router;