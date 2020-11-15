require("dotenv").config();
require("../lib/connection");
const Restaurant = require("../models/restaurant.model");

Restaurant.insertMany([
    {
        name: "Fat Cow",
        location: "Orchard",
        owner: "Bob",
    },
    {
        name: "Godmama",
        location: "City Hall",
        owner: "Chef Yu",
    },
    {
        name: "The White Rabbit",
        location: "Dempsey",
        owner: "Rick Sanchez",
    },
    {
        name: "Wild Honey",
        location: "Orchard",
        owner: "John Cena",
    },
    {
        name: "Koma Singapore",
        location: "Marina Bay",
        owner: "Atas people",
    },

])
    .then((suc) => {
        console.log("successfully added!");
    })
    .catch((e) => {
        console.log(e);
    });