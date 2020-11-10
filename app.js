//imports
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

//models
const Restaurant = require('./models/restaurant.model');

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //watch public folder
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use(methodOverride("_method"));

//connect to mongodb
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},
    (err) => {
        console.log("MongoDB Connected")
    }
)

//routes
app.get("/", async (req, res) => {
    let restaurants = await Restaurant.find();
    try {
        res.render("restaurants/index", { restaurants });
    } catch (error) {
        console.log(error)
    }
})

app.get("/new", (req, res) => {
    res.render("restaurants/new");
})

app.post("/new", (req, res) => {
    let { name, location, cuisineData, owner } = req.body;
    let cuisine = cuisineData.split(",");
    let data = {
        name,
        location,
        cuisine,
        owner,
    };

    //build model for save
    let restaurant = new Restaurant(data)

    restaurant.save().then((success) => {
        res.redirect("/")
    }).catch((error) => {
        console.log(error);
    })
})

app.get("/show/:id", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id)
        res.render("restaurants/show", { restaurant });
    } catch (error) {
        console.log(error);
    }
})

app.get("/edit/:id", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        res.render("restaurants/edit", { restaurant });
    } catch (error) {
        console.log(error);
    }
})

app.put("/edit/:id", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
    Restaurant.findByIdAndDelete(req.params.id).then((success) => {
        res.redirect("/");
    }).catch((error) => {
        console.log(error);
    })
})

//listen
app.listen(process.env.PORT, () => console.log(`Running on PORT ${process.env.PORT}`));