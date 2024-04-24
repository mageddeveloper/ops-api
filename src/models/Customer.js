import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
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
