

const mongoose = require('mongoose');
//legg til flere 
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    lastname: {type:String, required: true},
    phone: {type:Number, required: true},
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    age : {type:Number, required: true},
    interest : {type: String , required:true},
    imageUser:{type:String, required: true}
});



module.exports = mongoose.model('User', userSchema);