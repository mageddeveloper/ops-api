import App from "@models/App.js";

const verifyApiKey = async (req, res, next) => {
  const apiKey = req.headers.authkey;
  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized: API key is missing" });
  }

  try {
    // Find the app with the provided API key
    const app = await App.findOne({
      $or: [{ secretApiKeyDev: apiKey }, { secretApiKeyLive: apiKey }],
    });

    if (!app) {
      return res.status(401).json({ message: "Unauthorized: Invalid API key" });
    }

    // Attach the app details to the request object
    req.customApp = app;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid API key" });
  }
};

export default verifyApiKey;
