/** @module SubscriptionPlanModel */

import { model, Schema } from 'mongoose';

const SubscriptionPlanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  access: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    default: "monthly",
    required: false
  },
  max_services: {
    type: Number,
    required: true
  },
  max_categories: {
    type: Number,
    required: true
  },
  max_emails: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default model('SubscriptionPlan', SubscriptionPlanSchema);
