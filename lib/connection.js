const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("MongoDB Connected!");
        }
    }
)