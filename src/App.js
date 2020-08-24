import React, { useState, useEffect } from "react";
import Message from "./Message.js";
import "./App.css";

// material ui imports
import { Button } from "@material-ui/core";
import { FormControl, InputLabel, Input } from "@material-ui/core";

// firebase imports
import { db } from "./firebase.js";
import firebase from "firebase"; // pulling from the module not the file

// animation import from flipmove
import FlipMove from "react-flip-move";

function App() {
	//
	//! UseState
	// state allows you to make a change on the page without refreshing the whole page
	// via the react dom

	const [input, setInput] = useState("");
	const [username, setUsername] = useState("");
	const [messages, setMessages] = useState([]);

	//! UseEffect

	useEffect(() => {
		// run once when the app component loads
		db
			//
			.collection("messages")
			//
			.orderBy("timestamp", "desc")
			//
			.onSnapshot((snapshot) => {
				//
				setMessages(
					snapshot.docs.map((doc) => ({
						//
						id: doc.id,
						//
						message: doc.data()
						//
					}))
				);
			});
		return () => {
			// cleanup
		};
	}, []);

	useEffect(() => {
		//
		setUsername(prompt("Please enter your name"));
		// pop up to prompt to enter your name
		// the name that you enter will be stored in the variable username
		// this line is similar to --> const username = prompt ('Please enter your name')
		// the variable username stores a prompt and users answer to the prompt

		return () => {
			// cleanup;
		};
		// if we pass input as a dependancy
		// then every single time the input changes,
		// the code in the useEffect will run.
		// if we don't pass any dependcies,
		// then the code will in the useEffect will only run once
	}, []);

	console.log(input);
	// this will show that the input is being recieved in the console

	console.log(messages);
	// this will show that
	// [a] all inputs are being stored in the 'messages' array
	// [b] new inputs are submitted, they are added to the end of inputs, which are already in the 'messages' array
	// [c] when the send message button is pressed, the input field is cleared and made blank

	const sendMessage = (event) => {
		event.preventDefault();
		// By default, the input field gets refreshed every time something is submitted
		// This line of code stops the input field from refereshing.
		// As a result, the previous messages that were inputed, will not be erased.

		db.collection("messages").add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});

		// all the logic to send messages
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
			<form>
				<FormControl>
					<InputLabel>Enter a message</InputLabel>
					{/* input is from material ui */}
					<Input
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					{/* button is from material ui */}
					<Button
						disabled={!input}
						// If nothing is typed in the input field, then disable the button.
						// So if i press enter, or press the button, without typing anything then the form won't respond.
						// This ensures that empty strings (from pressing enter without typing) won't be pushed into the messages array
						variant="contained"
						// from material ui
						color="primary"
						// from material ui
						type="submit"
						onClick={sendMessage}
					>
						send messages
					</Button>
				</FormControl>
			</form>
			{/* messages themselves */}
			{/* To be able to send messages by pressing enter after we finish typing, we have to:
      [a] add submit="type" to the button 
      [b] wrap the input and button in a form tag
      [c] add event.preventdefault line to stop form from refreshing */}

			<FlipMove>
				{/* Here we are wrapping the messages with flipmove. 
            Flipmovie will ensure that the messages will behave smoothly on the page.
            So when a message is pushed down, because a new message has been submitted,
            the message will be pushed down in a smooth manner.
            And when a new message is submitted, 
            the message will appear on the page in a smooth manner.*/}
				{messages.map(({ id, message }) => (
					// loop through the messages array and
					<Message
						key={id}
						username={username}
						// display the username
						message={message}
						// display the text
						// Take the text, and pass it through (or merge it with)
						// the 'Message; component that's in the Message.js file
						// display each message in the messages array
					/>
				))}
			</FlipMove>
		</div>
	);
}

export default App;
