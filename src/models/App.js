import mongoose from 'mongoose';
import crypto from 'crypto';
const { Schema, model } = mongoose;

const appSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  appName: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  environment: {
    type: String,
    enum: ['dev', 'live'],
    required: true
  },
  secretApiKeyDev: {
    type: String,
    required: true
  },
  secretApiKeyLive: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

// Middleware to generate and encrypt secret API keys before saving
appSchema.pre('save', function(next) {
  // Generate unique API keys for dev and live environments
  const secretApiKeyDev = crypto.randomBytes(20).toString('hex');
  const secretApiKeyLive = crypto.randomBytes(20).toString('hex');

  // Encrypt dev API key
  const cipherDev = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encryptedSecretApiKeyDev = cipherDev.update(secretApiKeyDev, 'utf8', 'hex');
  encryptedSecretApiKeyDev += cipherDev.final('hex');

  // Encrypt live API key
  const cipherLive = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encryptedSecretApiKeyLive = cipherLive.update(secretApiKeyLive, 'utf8', 'hex');
  encryptedSecretApiKeyLive += cipherLive.final('hex');

  this.secretApiKeyDev = encryptedSecretApiKeyDev;
  this.secretApiKeyLive = encryptedSecretApiKeyLive;
  next();
});

const App = model('App', appSchema);

export default App;
