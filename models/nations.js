const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nationsSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const Nations = mongoose.model('nationwcs', nationsSchema);

module.exports = Nations;
