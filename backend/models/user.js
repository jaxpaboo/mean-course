const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// note: Propercase for types in Node.
const userSchema = mongoose.Schema({
  // NOTE: unique is not a validator.  Allow Mongoose and Mongo
  // to do some interal optimizations since it knows this will
  // be unique.   Use mongoose-unique-validator packa ge instead.
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
