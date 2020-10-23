/** @module ServiceModel */

import { model, Document, Schema } from 'mongoose';

export interface IServiceModel extends Document {
  _id: string;
  user_id: string;
  name: string;
  category_id: string;
  description: string;
  value: number;
}

const ServiceSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default model<IServiceModel>('Service', ServiceSchema);
