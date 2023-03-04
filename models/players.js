const mongoose = require('mongoose');
const Schema = mongoose.Schema
const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    isCaptain: {
        type: Boolean,
        required: true
    }
});

const Players = mongoose.model('playerwcs', playerSchema);

module.exports = Players;
