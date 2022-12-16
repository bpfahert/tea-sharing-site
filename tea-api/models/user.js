const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: [true, "Username required"], minLength: 3, maxLength: 15},
    account_created: {type: Date},
    favorite_teas: {type: Array},
    uploaded_teas: {type: Array},
    email: {type: String},
});

UserSchema.virtual("url").get(function () {
    return `/user/${this.id}`;
});

module.exports = mongoose.model("User", UserSchema);