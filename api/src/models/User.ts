/** @module UserModel */

import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subscription_plan_id: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true,
    required: false
  },
  status: {
    type: Boolean,
    default: false,
    required: false
  },
  expiration_date: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
});

export default model('User', UserSchema);
