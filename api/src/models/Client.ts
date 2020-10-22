/** @module ClientModel */

import { model, Schema } from 'mongoose';

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

export default model('Client', ClientSchema);
