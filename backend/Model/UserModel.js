const mongoose = require("mongoose");
const UserSchema = require("../Schema/UserSchema");

const UserModel = mongoose.model("Users JWT", UserSchema);

module.exports = UserModel;
