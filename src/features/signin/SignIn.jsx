import React, { useEffect, useState } from 'react';
import { db } from "../../firebase";
import "./SignIn.scss";

export default function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    const { setScreen, setUser } = props;

    useEffect(() => {
		db.collection("users").onSnapshot((snapshot) => {
			let users = snapshot.docs.map((doc) => {
				let user = doc.data();
				user.id = doc.id;
				return user;
			});
			setUsers(users);
		});
	}, []);

    function onSubmit(e) {
        e.preventDefault();

        let found = false;
		for (let i = 0; i < users.length; i++) {
			if (users[i].username === username && users[i].hash === password) {
				found = true;
				break;
			}
        }
        
        if (found) {
            alert("Đăng nhập thành công!");
            setUser(username);
            setScreen("MESSENGER");
		} else {
			alert("Tài khoản không tồn tại hoặc sai mật khẩu!");
		}
    }

    return (
        <div className="sign-in">
            <div className="sign-in__container">
                <h1 className="sign-in__title">Sign In</h1>
                <form className="sign-in__form" onSubmit={(e) => onSubmit(e)}>
                    <input className="sign-in__input" type="text" placeholder="Tên tài khoản" onChange={(e) => setUsername(e.target.value.toLowerCase())} required/>
                    <input className="sign-in__input" type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} required/>
                    <button className="sign-in__btn" type="submit">Đăng nhập</button>
                    <button className="sign-in__btn" onClick={() => setScreen("SIGNUP")}>Đăng ký</button>
                </form>
            </div>
        </div>
    )
}
