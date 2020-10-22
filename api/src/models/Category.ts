/** @module CategoryModel */

import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export default model('Category', CategorySchema);
