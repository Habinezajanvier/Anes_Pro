import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  platform: {
    type: String,
    enum: ['email', 'google']
  },
  username: String,
  firstName: String,
  secondName: String,
  profilePhotoUrl: String,
  email: String,
  password: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);
export default User;
