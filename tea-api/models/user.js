const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, minLength: 3, maxLength: 15},
    password: {type: String, required: true},
    favorite_tea_type: {type: String},
    account_created: {type: Date},
    favorite_teas: [{type: Schema.Types.ObjectId, ref: "Tea"}],
    teas_added: [{type: Schema.Types.ObjectId, ref: "Tea"}],
    recommended_teas: [{
        tea_rec: {type: Schema.Types.ObjectId, ref:"Tea"},
        recommended_by: {type: Schema.Types.ObjectId, ref: "User"},
        message: {type: String}
    }],
    email: {type: String},
    saved_teas: [{type: Schema.Types.ObjectId, ref: "Tea"}],
});

UserSchema.virtual("url").get(function () {
    return `/user/${this.id}`;
});

module.exports = mongoose.model("User", UserSchema);