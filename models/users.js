const mongoose = require("mongoose"),
bcrypt = require('bcrypt'),
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


    userSchema.pre("save", function(next) {
        let user = this; 
      
        bcrypt.hash(user.password, 10).then(hash => {
          user.password = hash; 
          next(); 
        })
        .catch(error => {
          console.log(`Error in hasing password: ${error.message}`);
          next(error);
        });
      });
      
      userSchema.methods.passwordComparison = function(inputPassword) {
        let user = this; 
        return bcrypt.compare(inputPassword, user.password);
      };    

module.exports = mongoose.model("User", userSchema);