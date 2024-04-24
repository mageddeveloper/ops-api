import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  orderNumberExternal: {
    type: String,
    required: true
  },
  orderNumberInternal: {
    type: String,
    unique: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  appId: {
    type: Schema.Types.ObjectId,
    ref: 'App',
    required: true
  },
  orderDetails: {
    type: String,
    required: true
  },
  confirmationStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
}, {
  timestamps: true
});

const Order = model('Order', orderSchema);

export default Order;
