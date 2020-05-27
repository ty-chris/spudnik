const admin = require('firebase-admin');
admin.initilizeApp();
const db = admin.firestore();
module.exports = { admin, db };