/** @module ServiceOrder */

import { model, Document, Schema } from 'mongoose';

export interface IServiceOrderModel extends Document {
  _id: string;
  user_id: string;
  client_id: string;
  services: object;
  title: string;
  description: string;
  time: object;
  is_closed: boolean;
  value: number;
}

const ServiceOrderSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  services: [{
    service_id: { type: String }
  }],
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  time: {
    start: { type: Date },
    end: { type: Date }
  },
  is_closed: {
    type: Boolean,
    default: false
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default model<IServiceOrderModel>('ServiceOrder', ServiceOrderSchema);
