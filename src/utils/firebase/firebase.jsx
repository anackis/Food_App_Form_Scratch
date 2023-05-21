

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection, 
  getDocs
} from "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const createUserDocumentFromAuth = async (userAuth, additionalInformation ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      // console.log('error creating the user ', error.message );
    }
  }

  return userDocRef;
};



export const getDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const response = docSnap.data();
    return response;
  } else {
    // console.log("No such document!");
  }
}


export const updateDb = async (uid, update) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, update);
}


export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => doc.data());
  return users;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}
