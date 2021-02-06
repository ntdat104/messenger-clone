import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./SignUp.scss";

export default function SignUp(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [users, setUsers] = useState([]);

	const { setScreen } = props;

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
			if (users[i].username === username) {
				found = true;
				break;
			}
		}
		if (found) {
            alert("Tài khoản đã tồn tại!");
		} else {
			alert("Đăng ký thành công!");
			const user = {
				username: username,
				hash: password,
			};
			db.collection("users").add(user);
			setScreen("SIGNIN");
		}
	}

	return (
		<div className="sign-up">
			<div className="sign-up__container">
				<h1 className="sign-up__title">Sign Up</h1>
				<form className="sign-up__form" onSubmit={(e) => onSubmit(e)}>
					<input
						type="text"
						className="sign-up__input"
						placeholder="Tên tài khoản"
						onChange={(e) =>
							setUsername(e.target.value.toLowerCase())
						}
						required
					/>
					<input
						type="password"
						className="sign-up__input"
						placeholder="Mật khẩu"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit" className="sign-up__btn">
						Đăng ký
					</button>
				</form>
			</div>
		</div>
	);
}
