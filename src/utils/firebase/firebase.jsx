
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
import { deleteDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

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



export const updateLikesDislikes = async (cardId, userId, type) => {
  const docRef = doc(db, "cards", cardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const cardData = docSnap.data();

    if (type === 'like') {
      if (cardData.likedList.includes(userId)) {
        await updateDoc(docRef, {
          likes: cardData.likes - 1,
          likedList: cardData.likedList.filter(id => id !== userId)
        });
      } else {
        await updateDoc(docRef, {
          likes: cardData.likes + 1,
          likedList: [...cardData.likedList, userId]
        });
      }
    }

    if (type === 'dislike') {
      if (cardData.dislikedList.includes(userId)) {
        await updateDoc(docRef, {
          dislikes: cardData.dislikes - 1,
          dislikedList: cardData.dislikedList.filter(id => id !== userId)
        });
      } else {
        await updateDoc(docRef, {
          dislikes: cardData.dislikes + 1,
          dislikedList: [...cardData.dislikedList, userId]
        });
      }
    }
  } else {
    console.log("card does not exist")
  }
}


export const updateFavorites = async (cardId, userId) => {
  const cardRef = doc(db, "cards", cardId);
  const cardSnap = await getDoc(cardRef);

  if (cardSnap.exists()) {
    const cardData = cardSnap.data();
    let updatedFavorites = cardData.favoriteList ? [...cardData.favoriteList] : [];

    if (updatedFavorites.includes(userId)) {
      updatedFavorites = updatedFavorites.filter(id => id !== userId);
    } else {
      updatedFavorites.push(userId);
    }

    await updateDoc(cardRef, {
      favoriteList: updatedFavorites,
    });
  } else {
    console.log("No such card!");
  }
};

export const deleteCardFromDb = async (cardId) => {
  const cardRef = doc(db, "cards", cardId);

  await deleteDoc(cardRef);
};


export const getCardById = async (cardId) => {
  const docRef = doc(db, "cards", cardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such card!");
    return null;
  }
}


export const updateDbPlan = async (userId, day, meal) => {
  const userDocRef = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDocRef);

  if(userSnapshot.exists()) {
    let userData = userSnapshot.data();
    let userDiet = userData.diet;

    let dietDay = userDiet.find(d => d.day === day);

    if(dietDay) {
      dietDay.meals.push(meal);
    } else {
      dietDay = { day: day, meals: [meal] };
      userDiet.push(dietDay);
    }

    await updateDoc(userDocRef, { diet: userDiet });
  } else {
    console.log("User does not exist");
  }
};

export const deleteMealFromDbPlan = async (userId, day, meal) => {
  const userDocRef = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    let userData = userSnapshot.data();
    let userDiet = userData.diet;

    let dietDay = userDiet.find(d => d.day === day);

    if (dietDay) {
      const mealIndex = dietDay.meals.findIndex(m => m.id === meal.id);
      if (mealIndex !== -1) {
        dietDay.meals.splice(mealIndex, 1);
        await updateDoc(userDocRef, { diet: userDiet });
      }
    }
  } else {
    console.log("User does not exist");
  }
};


export const fetchUserDietFromFirebase = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    if (userData.diet) {
      return userData.diet;
    } else {
      console.log('No diet data found for this user.');
    }
  } else {
    console.log("No such document!");
  }

  return [];
}


