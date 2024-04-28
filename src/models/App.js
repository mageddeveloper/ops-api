import mongoose from "mongoose";
import crypto from "crypto";
const { Schema, model } = mongoose;

const appSchema = new Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    environment: {
      type: String,
      enum: ["dev", "live"],
      default: "dev",
    },
    secretApiKeyDev: {
      type: String,
    },
    secretApiKeyLive: {
      type: String,
    },
    activeConfirmationFlow: {
      type: Schema.Types.ObjectId,
      ref: "ConfirmationFlow",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to generate and encrypt secret API keys before saving
appSchema.pre("save", async function (next) {
  try {
    // Generate unique API keys for dev and live environments
    const secretApiKeyDev = crypto.randomBytes(20).toString("hex");
    const secretApiKeyLive = crypto.randomBytes(20).toString("hex");

    // Encrypt dev API key
    const cipherDev = crypto.createCipher(
      "aes-256-cbc",
      process.env.ENCRYPTION_KEY
    );
    let encryptedSecretApiKeyDev = cipherDev.update(
      secretApiKeyDev,
      "utf8",
      "hex"
    );
    encryptedSecretApiKeyDev += cipherDev.final("hex");

    // Encrypt live API key
    const cipherLive = crypto.createCipher(
      "aes-256-cbc",
      process.env.ENCRYPTION_KEY
    );
    let encryptedSecretApiKeyLive = cipherLive.update(
      secretApiKeyLive,
      "utf8",
      "hex"
    );
    encryptedSecretApiKeyLive += cipherLive.final("hex");

    // Set the generated and encrypted secret API keys to the document
    this.secretApiKeyDev = encryptedSecretApiKeyDev;
    this.secretApiKeyLive = encryptedSecretApiKeyLive;

    // Continue with the save operation
    return next();
  } catch (error) {
    return next(error);
  }
});

const App = model("App", appSchema);

export default App;
