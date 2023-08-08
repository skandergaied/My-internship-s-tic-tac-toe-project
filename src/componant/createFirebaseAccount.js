import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from './Firebase';

export async function createFirebaseAccount(email, password, name, nOfWins, nga, noflosing) {
    const auth = getAuth();
    const userCollectionRef = collection(db, "players");

    const emailQuery = query(userCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {

        const docRef = querySnapshot.docs[0].ref;
        await docRef.update({
            name: name,
            numberOfWins: nOfWins,
            numberofgames: nga,
            numberoflosing: noflosing,
        });
    } else {
        // If the email doesn't exist, add a new user document to the collection
        await addDoc(userCollectionRef, {
            email: email,
            name: name,
            numberOfWins: nOfWins,
            numberofgames: nga,
            numberoflosing: noflosing,
        });
    }
    console.log("Data added to Firestore successfully.");

    // Finally, create the Firebase account (if not already created)
    return createUserWithEmailAndPassword(auth, email, password);
}
