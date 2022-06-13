const mongoose = require("mongoose"),
{ Schema } = mongoose,
userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true,
            required: true
        },
        last: {
            type: String, 
            trim: true,
            required: true
        }
    },
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true

    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    password: {
        type: String, 
        required: true
    },
    events: [{type: Schema.Types.ObjectId, ref: "Event"}],
    subscribedAccound: {type: Schema.Types.ObjectId, ref: "Subscriber"}
}, {
    timestamps: true
});

userSchema.virtual("fullName").get(
    function () {
        if(this.name.first !== undefined && this.name.last !== undefined){return `${this.name.first} ${this.name.last}`}
        
        else { return 'no name'}  }
)

userSchema.virtual("characters").get(
    function () {
        if(this.name.first !== undefined && this.name.last !== undefined){return (this.name.first.length + this.name.last.length )}
        else { return 0}
    });

module.exports = mongoose.model("User", userSchema);