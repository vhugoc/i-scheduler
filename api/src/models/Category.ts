/** @module CategoryModel */

import { model, Document, Schema } from 'mongoose';

export interface ICategoryModel extends Document {
  _id: string;
  user_id: string;
  name: string;
  description: string;
}

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

export default model<ICategoryModel>('Category', CategorySchema);
