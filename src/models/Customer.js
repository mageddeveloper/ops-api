import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  appId: {
    type: Schema.Types.ObjectId,
    ref: 'App',
    required: true
  },
}, {
  timestamps: true
});

const Customer = model('Customer', customerSchema);

export default Customer;
