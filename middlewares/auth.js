import admin from 'firebase-admin';
import User from '../models/user.js';

const authenticateFirebaseToken = async (req, res, next) => {
    try {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      console.log('ID Token:', idToken);
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('Decoded Token:', decodedToken);
      const user = await User.findOne({ _id: decodedToken.uid });
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('Error authenticating Firebase token:', error);
      res.status(401).send('Unauthorized');
    }
  };
  
  export default authenticateFirebaseToken;