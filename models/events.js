const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    location_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Event cannot have negative cost"]
    },
    date: {
        type: Date,
        required: true
    }
},
    {
    timestamps: true
    }
)

module.exports = mongoose.model("Event", eventSchema)