const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeaSchema = new Schema({
    tea_name: {Type: String, required: [true, "Please add a tea name"], minLength: 2, maxLength: 20},
    type: {Type: String, enum: ["Green", "Black", "Herbal", "Oolong"]},
    brand: {Type: String, maxLength: 20},
    rating: {Type: Number, min: 1, max: 5},
    notes: {Type: String, maxLength: 300},
    created_by: {Type: Schema.Types.ObjectId, ref: "User", required: true},
});

TeaSchema.virtual("url").get(function() {
    return `/tea/${this._id}`;
});

module.exports = mongoose.model("Tea", TeaSchema);