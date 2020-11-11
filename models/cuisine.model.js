const mongoose = require("mongoose");
const { Schema } = mongoose;

const cuisineSchema = new Schema({
    cuisine: { type: String, required: true }
})

const Cuisine = mongoose.model("Cuisine", cuisineSchema);

module.exports =  Cuisine ;