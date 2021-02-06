import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";
import "./Messenger.scss";

export default function Messenger(props) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const chatContainer = React.createRef();

    const { user } = props;
    
    const scrollToMyRef = () => {
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);
    };

	useEffect(() => {
        db.collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
			let messages = snapshot.docs.map((doc) => {
				let message = doc.data();
				message.id = doc.id;
				return message;
			});
            setMessages(messages);
        });
    }, []);

    useEffect(() => {
        scrollToMyRef();
        // eslint-disable-next-line
    }, [chatContainer])
    
    function onSubmit(e) {
        e.preventDefault();
        db.collection("messages").add({
            username: user,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setMessage("");
    }

	return (
		<div className="messenger">
			<div className="messenger__container">
				<h1 className="messenger__title">Public</h1>
				<div ref={chatContainer} className="messenger__content">
                    {messages.map((message, index) => {
                        return <div className={message.username === user ? "messenger__user" : "messenger__friend"} key={index}>
                            <span className="messenger__message">{message.message}</span>
                            <span className="messenger__username">{message.username}</span>
                        </div>
                    })}
				</div>
				<form className="messenger__form" onSubmit={(e) => onSubmit(e)}>
					<input
						className="messenger__input"
						type="text"
                        placeholder="Aa"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
					/>
					<button className="messenger__btn" type="submit">
						Gửi
					</button>
				</form>
			</div>
		</div>
	);
}
