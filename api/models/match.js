const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: mongoose.Schema.Types.ObjectId, ref: 'Name', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Match', matchSchema);