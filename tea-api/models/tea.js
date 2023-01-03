const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./user");

const TeaSchema = new Schema({
    tea_name: {type: String, required: [true, "Please enter a tea name"], minLength: 2, maxLength: 20},
    type: {type: String},
    brand: {type: String, maxLength: 20},
    rating: {type: Number},
    average_rating: {type: Number},
    notes: {type: String, maxLength: 300},
    created_by: {type: Schema.Types.ObjectId, ref: "User"},
    created_on: {type: Date},
    updated_on: {type: Date},
    img: {data: Buffer, contentType: String},
});

TeaSchema.virtual("url").get(function () {
    return `/teas/${this.id}`;
});

module.exports = mongoose.model("Tea", TeaSchema);