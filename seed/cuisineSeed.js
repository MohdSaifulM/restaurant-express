require("dotenv").config();
require("../lib/connection");
const Cuisine = require("../models/cuisine.model");

Cuisine.insertMany([
    {
        cuisine: "Bar",
    },
    {
        cuisine: "Japanese",
    },
    {
        cuisine: "Steakhouse",
    },
    {
        cuisine: "German",
    },
    {
        cuisine: "Burgers",
    },
    {
        cuisine: "Fusion",
    },
    {
        cuisine: "All Day Breakfast",
    },
    {
        cuisine: "French",
    },
    {
        cuisine: "Italian",
    },
])
    .then((suc) => {
        console.log("successfully added!");
    })
    .catch((e) => {
        console.log(e);
    });