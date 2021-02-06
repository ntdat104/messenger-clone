import React, { useState } from "react";
import Home from "../features/home/Home";
import Messenger from "../features/messenger/Messenger";
import SignIn from "../features/signin/SignIn";
import SignUp from "../features/signup/SignUp";
import "./App.scss";

export default function App() {
    const [screen, setScreen] = useState("");
    const [user, setUser] = useState("");

    function renderScreen() {
        switch (screen) {
            case "SIGNIN":
                return <SignIn setUser={setUser} setScreen={setScreen}/>
            case "SIGNUP":
                return <SignUp setScreen={setScreen}/>
            case "MESSENGER":
                return <Messenger user={user}/>
            case "HOME":
            default:
                return <Home setScreen={setScreen}/>
        }
    }

	return (
        <>
            {renderScreen()}
        </>
	);
}
