const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    firstName:{type: String , required:true},
    lastName: { type: String , required:true},
    password: { type: String, required: true },
    googleId: String,
});

// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('User', UserSchema);