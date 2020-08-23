import React, { useState } from "react";
import "./App.css";

function App() {
	//! USESTATE

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	console.log(input);
	// this will show that the input is being recieved in the console

	console.log(messages);
	// this will show that
	// [a] all inputs are being stored in the 'messages' array
	// [b] new inputs are submitted, they are added to the end of inputs, which are already in the 'messages' array
	// [c] when the send message button is pressed, the input field is cleared and made blank

	const sendMessage = (event) => {
		// all the logic to send messages
		setMessages([...messages, input]);
		// store all the previous inputs in the messages array
		// add new inputs to the end of the messages array
		setInput("");
		// after send message is clicked,
		// clear the messages from the input,
		// and set the input field to be blank
	};

	//! USEFFECT

	return (
		<div className="App">
			<h1> Hello world </h1>

			{/* input field */}
			<input value={input} onChange={(event) => setInput(event.target.value)} />

			{/* button */}
			<button onClick={sendMessage}>send messages</button>

			{/* messages themselves */}
		</div>
	);
}

export default App;
