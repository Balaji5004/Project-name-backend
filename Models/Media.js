const mongoose = require("mongoose");

const Mediaschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        videos: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

module.exports = Media = mongoose.model("Media", Mediaschema);