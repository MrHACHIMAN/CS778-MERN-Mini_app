const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TBoardSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    Done: {
        type: Boolean,
        default: false
    },
    Time: {
        type: Number,
        default: -1
    }
});

const TBoardModel = mongoose.model('TBoard', TBoardSchema);

module.exports = TBoardModel;