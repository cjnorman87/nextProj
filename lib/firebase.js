import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseconfig = {
    apiKey: "AIzaSyCQhnuyLr3bzbn6IOuzIL7NVCCIv0FI3Pw",
    authDomain: "next-blog-76653.firebaseapp.com",
    databaseURL: "https://next-blog-76653-default-rtdb.firebaseio.com",
    projectId: "next-blog-76653",
    storageBucket: "next-blog-76653.appspot.com",
    messagingSenderId: "261958330437",
    appId: "1:261958330437:web:c178c5cd39bdcefca6db2c",
    measurementId: "G-HQXRECBMDP"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }
