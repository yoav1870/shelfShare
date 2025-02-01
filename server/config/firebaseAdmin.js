const admin = require("firebase-admin");
// const serviceAccount = require("./service-account-key.json"); //for local
const serviceAccount = require("/etc/secrets/service-account-key.json"); // for prod

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
