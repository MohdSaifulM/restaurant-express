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
require("./lib/connection");

//middleware for routes
app.get("/", (req, res) => {
    res.redirect("/restaurants")
})
app.use("/restaurants", require("./routes/restaurants.routes"));
app.use("/new", require("./routes/new.routes"));
app.use("/show", require("./routes/show.routes"));
app.use("/edit", require("./routes/edit.routes"));
app.delete("/delete/:id", (req, res) => {
    Restaurant.findByIdAndDelete(req.params.id).then((success) => {
        res.redirect("/");
    }).catch((error) => {
        console.log(error);
    })
})

//listen
app.listen(process.env.PORT, () => console.log(`Running on PORT ${process.env.PORT}`));