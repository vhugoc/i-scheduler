/** @module ServiceModel */

import { model, Schema } from 'mongoose';

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

export default model('Service', ServiceSchema);
