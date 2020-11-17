const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  hash: { type: String, required: true },
  dateOfBirth: Date,
  telephone: String,
});

module.exports = UserSchema;
