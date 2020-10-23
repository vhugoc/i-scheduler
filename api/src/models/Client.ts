/** @module ClientModel */

import { model, Document, Schema } from 'mongoose';

export interface IClientModel extends Document {
  _id: string;
  user_id: string;
  name: string;
  whatsapp: string;
  email: string;
}

const ClientSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export default model<IClientModel>('Client', ClientSchema);
