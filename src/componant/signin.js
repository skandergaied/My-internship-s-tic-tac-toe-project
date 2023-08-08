import React, { useEffect, useRef, useState } from "react";
import './SignInSignUp.css';
import {  Navigate,useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { db } from './Firebase';
import { useLocation } from "react-router-dom";

function SignInSignupWithLocalStorage(props) {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [show, setShow] = useState(false);
    const localSignUp = localStorage.getItem("signUp");
    const localEmail = localStorage.getItem("email");
    const localPassword = localStorage.getItem("password");
    const localName = localStorage.getItem("name");
    const [redirectToCell, setRedirectToCell] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (localEmail) {
            setShow(true);
        }
    }, [localSignUp, localEmail]);

    const history = useNavigate();

    const createFirebaseAccount = (email, password, name,nga,noflosing) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                const userCollectionRef = collection(db, "players");
                addDoc(userCollectionRef, { email:email,name:name,  numberOfWins:0, numberofgames:nga ,numberoflosing:noflosing})
                    .then(() => {
                        console.log("Data added to Firestore successfully.");
                        setRedirectToCell(true);
                    })
                    .catch((error) => {
                        console.error("Error adding data to Firestore:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating Firebase account:", error);
                alert("You already have an account ");
                history("/");
            });
    };
    const handleClick = (e) => {
        e.preventDefault();
        const playerName = name.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        if (playerName && emailValue && passwordValue) {
            if (passwordValue.length < 6) {
                alert("Password should be at least 6 characters long.");
                return;
            }
            localStorage.setItem("playerName", playerName);
            const initialPlayerData = { email:emailValue,score: 0, numberOfGames: 0 };
            localStorage.setItem(playerName, JSON.stringify(initialPlayerData));
            createFirebaseAccount(emailValue, passwordValue, playerName, 0, 0);
        } else {
            alert("Please fill in all the fields.");
        }
    };
    if (redirectToCell) {
        return (
            <Navigate
                to={{
                    pathname: "/game",
                    state: { playerName: localStorage.getItem("playerName") },
                }}
            />

        );
    }

    return (
        <div>
            <div className="container">
                <h1>Sign in  Page</h1>
                <form className={"add"}>
                    <div className="input_space">
                        <input placeholder="Name" type='text' ref={name} />
                    </div>
                    <div className="input_space">
                        <input placeholder="Email" type='text' ref={email} />
                    </div>
                    <div className="input_space">
                        <input placeholder="Password" type='password' ref={password} />
                    </div>
                    <button className="BT" onClick={handleClick} disabled={redirectToCell}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignInSignupWithLocalStorage;
