
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Corrected imports
import { doc } from "firebase/firestore";
import {updateDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLH73bsWCpuhVQFJkkL5abxzMO93n8HYY",
    authDomain: "tictactoereact-838d0.firebaseapp.com",
    projectId: "tictactoereact-838d0",
    storageBucket: "tictactoereact-838d0.appspot.com",
    messagingSenderId: "399968120895",
    appId: "1:399968120895:web:a980aac4a2af10fd1c888a"
};

const app = initializeApp(firebaseConfig);
const database  = getAuth(app);
const db = getFirestore(app);
const colRef = collection(db, 'players');
async function getDocumentIDs() {
    try {
        const snapshot = await getDocs(colRef);
        let book = []; // Initialize the array outside the loop
        snapshot.docs.forEach((doc) => {
            // Push only the data of the document into the book array
            book.push({ ...doc.data() });

        });
        return book; // Return the array after the loop finishes
    } catch (error) {
        console.error("Error getting documents:", error);
        throw error; // Propagate the error further
    }
}


// Call the fetchData function


//*******************************************
function fetchAndProcessDocuments(){
    getDocs(colRef)
        .then((snapshot) => {
            let books = [];
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id: doc.id });
            });
        })
        .catch((error) => {
            console.error("Error getting documents:", error);
        });
}
//*****************************************************
function findIdByEmail(email, books) {
    for (const book of books) {
        if (book.email === email) {
            return book.id;
        }
    }
    return null;
}

async function fetchAndFindIdByEmail(email) {
    try {
        const snapshot = await getDocs(colRef);
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        const foundId = findIdByEmail(email, books);
        if (foundId) {
            return foundId;
        } else {
            console.log("No document found with the email " + email + ".");
            return null; // Return null to indicate that no document was found
        }
    } catch (error) {
        console.error("Error getting documents:", error);
        return null;
    }
}

const updatePlayerData = async (playerName, newScore, newNumberOfGames,loose) => {
    const playerRef = doc(db, "players",playerName);
    try {
        await updateDoc(playerRef, {
            numberOfWins: newScore,
            numberofgames: newNumberOfGames,
            numberoflosing:loose
        });
        console.log("Player data updated successfully in Firestore.");
    } catch (error) {
        console.error("Error updating player data in Firestore:", error);
    }
};
//******************************
function findDataByEmail(email, books) {
    for (const book of books) {
        if (book.email === email) {
            return {

                numberOfGames: book.numberofgames,
                numberOfWins: book.numberOfWins,
                numberOfLosses: book.numberoflosing,
            };
        }
    }
    return null;
}

async function fetchAndFiDndataByEmail(email) {
    try {
        const snapshot = await getDocs(colRef);
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        const userData = findDataByEmail(email, books);
        if (userData) {
            return userData;
        } else {
            console.log("No document found with the email " + email + ".");
            return null; // Return null to indicate that no document was found
        }
    } catch (error) {
        console.error("Error getting documents:", error);
        return null;
    }
}
//***********************************




export { database, db , getDocumentIDs,fetchAndProcessDocuments,fetchAndFindIdByEmail,updatePlayerData,fetchAndFiDndataByEmail};
