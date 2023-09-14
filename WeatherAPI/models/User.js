const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    location: { 
        type: String, 
        required: true 
    },
  
    weatherData: [{
        date: { 
            type: Date, 
            default: Date.now 
    },
        temperature: Number,
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;