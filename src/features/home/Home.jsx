import React from 'react';
import "./Home.scss";

export default function Home(props) {
    const { setScreen } = props;

    return (
        <div className="home">
            <div className="home__container">
                <h1 className="home__title">Messenger</h1>
                <button className="home__btn" onClick={() => setScreen("SIGNIN")}>Đăng nhập</button>
                <button className="home__btn" onClick={() => setScreen("SIGNUP")}>Đăng ký</button>
            </div>
        </div>
    )
}
