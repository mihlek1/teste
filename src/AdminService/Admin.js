

const admin = require('firebase-admin');
const serviceAccount = require('../AdminService/Admin.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<server-68390/>.firebaseio.com'
});
const app = admin.initializeApp();
const db = admin.firestore();