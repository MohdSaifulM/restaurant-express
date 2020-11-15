const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");
const Cuisine = require("../models/cuisine.model");

router.get("/:id/", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id).populate("cuisine");
        let cuisine = await Cuisine.find();
        res.render("restaurants/edit", { restaurant, cuisine });
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", (req, res) => {

    let data = {
        name: req.body.name,
        location: req.body.location,
        owner: req.body.owner,
        cuisine: req.body.cuisines,
    };
    Restaurant.findByIdAndUpdate(req.params.id, data).then((success) => {
        res.redirect(`/show/${req.params.id}`);
    }).catch((error) => {
        console.log(error);
    })
})

router.put("/:id/:cuisine", async (req, res) => {
    let cuisineArr = [];
    try {
        let restaurant = await Restaurant.findById(req.params.id).populate("cuisine");
        restaurant.cuisine.forEach(element => {
            if(element._id != req.params.cuisine){
                cuisineArr.push(element._id)
            }
        });
        let data = {
            name: restaurant.name,
            location: restaurant.location,
            owner: restaurant.owner,
            cuisine: cuisineArr,
        };
        Restaurant.findByIdAndUpdate(req.params.id, data).then((success) => {
            res.redirect(`/show/${req.params.id}`);
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;