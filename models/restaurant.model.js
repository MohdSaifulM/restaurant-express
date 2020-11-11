const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    location: String,
    cuisine: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuisine",
    }],
    owner: String
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;