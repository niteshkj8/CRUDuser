import admin from 'firebase-admin';

const authenticateFirebaseToken = async (req, res, next) => {
  try{
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    next();
  }
  catch(error) {
    console.error('Error authenticating Firebase token:', error);
    res.status(401).send('Unauthorized');
  }
};

export default authenticateFirebaseToken;