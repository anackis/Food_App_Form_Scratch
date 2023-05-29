

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection, 
  getDocs,
  addDoc
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

export const getCardsDb = async () => {
  const querySnapshot = await getDocs(collection(db, "cards"));
  const cards = [];

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      const card = doc.data();
      cards.push(card);
    }
  });

  return cards;
};


export const updateDb = async (uid, update) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, update);
}


// export const addObjectToCollection = async (collectionName, objectData) => {
//   try {
//     const collectionRef = collection(db, collectionName);

//     const collectionSnapshot = await getDocs(collectionRef);
//     if (collectionSnapshot.size === 0) {
//       await setDoc(collectionRef, {});
//     }

//     const docRef = await addDoc(collectionRef, objectData);
//     console.log("Object added to collection successfully!", docRef.id);
//   } catch (error) {
//     console.error("Error adding object to collection: ", error);
//   }
// };
export const addObjectToCollection = async (collectionName, objectData) => {
  try {
    const collectionRef = collection(db, collectionName);

    const collectionSnapshot = await getDocs(collectionRef);
    if (collectionSnapshot.size === 0) {
      await setDoc(collectionRef, {});
    }

    const docRef = await addDoc(collectionRef, objectData);
    
    await updateDoc(docRef, { firebaseId: docRef.id });
    
    console.log("Object added to collection successfully!", docRef.id);
  } catch (error) {
    console.error("Error adding object to collection: ", error);
  }
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => doc.data());
  return users;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}



export const updateCardLikes = async (cardId, likes) => {
  const cardRef = doc(db, "cards", cardId);

  try {
    await updateDoc(cardRef, { likes });
    console.log("Card likes updated successfully!");
  } catch (error) {
    console.error("Error updating card likes: ", error);
  }
};

export const updateCardDislikes = async (cardId, dislikes) => {
  const cardRef = doc(db, "cards", cardId);

  try {
    await updateDoc(cardRef, { dislikes });
    console.log("Card likes updated successfully!");
  } catch (error) {
    console.error("Error updating card likes: ", error);
  }
};



