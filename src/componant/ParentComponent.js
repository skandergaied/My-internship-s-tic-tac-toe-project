import React from "react";
import SignInSignupWithLocalStorage from "./SignInSignupWithLocalStorage";

const ParentComponent = () => {
    const handleSubmit = (nameInput) => {

        console.log("Submitted name:", nameInput);
    };

    return (
        <div>
            {/* Pass the handleSubmit function as the onSubmit prop */}
            <SignInSignupWithLocalStorage onSubmit={handleSubmit} />
        </div>
    );
};

export default ParentComponent;