const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");
const Cuisine = require("../models/cuisine.model");

router.get("/", (req, res) => {
    res.render("restaurants/new");
})

router.post("/", async (req, res) => {
    try {
        let resData = {
            name: req.body.name,
            location: req.body.location,
            owner: req.body.owner,
            cuisine: [],
        };

        let cuisineData = {
            cuisine: req.body.cuisine.split(",")
        }

        //build model for save

        let restaurant = new Restaurant(resData);
        let refCuisine = await Cuisine.find();
        let refCuisineArr = [];
        refCuisine.forEach(el => {
            if(refCuisineArr.indexOf(el.cuisine) == -1){
                refCuisineArr.push(el.cuisine);
            }
        })
        console.log(refCuisineArr)

        cuisineData.cuisine.forEach(element => {
            console.log(refCuisineArr.indexOf(element))
            if (refCuisineArr.indexOf(element) == -1) {
                let c = {
                    cuisine: element
                }
                let cuisine = new Cuisine(c);
                restaurant.cuisine.push(cuisine._id);
                (async () => {
                    await cuisine.save().then((suc) => {
                        console.log("added cuisine")
                    });
                    await restaurant.save().then((suc) => {
                        console.log("added cuisine to restaurant")
                    });
                })();
            } else {
                restaurant.cuisine.push(refCuisine[element]._id);
                (async () => {
                    await restaurant.save().then((suc) => {
                        console.log("added cuisine to restaurant")
                    });
                })();
            }
            
        })

    } catch (error) {
        console.log(error);
        console.log("Nothing!")
    }
    res.redirect("/");
})

module.exports = router;