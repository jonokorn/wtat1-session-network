const mongoose = require("mongoose"),
bcrypt = require('bcrypt'),
passportLocalMongoose = require("passport-local-mongoose"),
{ Schema } = mongoose,
randToken = require("rand-token"),
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
    events: [{type: Schema.Types.ObjectId, ref: "Event"}],
    subscribedAccound: {type: Schema.Types.ObjectId, ref: "Subscriber"},
    apiToken: {
        type:String
    }
}, {
    timestamps: true
});

userSchema.pre("save", function(next) {
    let user = this;
    console.log("user ", user);
    if (!user.apiToken){
        user.apiToken = randToken.generate(16);
        console.log("generated token ")
    }
    next();
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

  


userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
}),

module.exports = mongoose.model("User", userSchema);