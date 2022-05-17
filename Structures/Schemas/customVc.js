const mongoose = require("mongoose");

const vcSchema = new mongoose.Schema({
    GuildID: String,
    VcOn: Boolean,
    VcChannelId: String,
    VcCategoryId: String,

});

const vcModel = mongoose.model('vcModel', vcSchema);

module.exports = vcModel;