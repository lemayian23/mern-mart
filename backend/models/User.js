const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist'
  }
}, {
  timestamps: true
});

// Add pre-remove middleware to delete associated wishlist
userSchema.pre('remove', async function(next) {
  await mongoose.model('Wishlist').deleteOne({ user: this._id });
  next();
});

module.exports = mongoose.model('User', userSchema);