const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dates: [{
        date: String,
        time: String
    }]
}, {
    timestamps: true
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;