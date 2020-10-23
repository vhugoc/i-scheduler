/** @module UserModel */

import { model, Document, Schema } from 'mongoose';

export interface IUserModel extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  subscription_plan_id: string;
  is_active: boolean;
  status: boolean;
  expiration_date: Date;
}

const UserSchema: Schema = new Schema({
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

export default model<IUserModel>('User', UserSchema);
