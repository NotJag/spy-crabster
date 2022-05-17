const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    GuildID: String,
    TicketStatus: Boolean,
    TicketCategory: String,
    TicketMessage: String,
    TicketCreateMessage: String,
    TicketLogChannel: String,

});

const ticketModel = mongoose.model('ticketModel', ticketSchema);

module.exports = ticketModel;