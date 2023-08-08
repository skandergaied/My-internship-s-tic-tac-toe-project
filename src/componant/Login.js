import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { fetchAndProcessDocuments } from './Firebase';
import {database } from './Firebase';

function SignInSignupWithLocalStorage() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log("User's name:", name);
        fetchAndProcessDocuments();
        signInWithEmailAndPassword(database, email, password)
            .then((data) => {
                console.log(data, "authData");
                history("/game");
            })
            .catch((err) => {
                setError(err.code);
                if (err.code === "auth/user-not-found") {
                    history("/Signin");
                }
            });
    };

    return (
        <div>
            <div className="container">
                <h1>Login Page</h1>
                {error && <p style={{ color: "red" }}>{"wrong password"}</p>}
                <form className={"add"} onSubmit={handleSubmit}>
                    <div className="input_space">
                        <input placeholder="Name" type="text" ref={nameRef} />
                    </div>
                    <div className="input_space">
                        <input placeholder="Email" type="text" ref={emailRef} />
                    </div>
                    <div className="input_space">
                        <input placeholder="Password" type="password" ref={passwordRef} />
                    </div>
                    <button className="BT" type="submit">
                        Log in
                    </button>
                </form>
                <div className={"w-100 text-center mt-2"}>
                    Need an account?
                    <Link to={"/Signin"}>Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignInSignupWithLocalStorage;
