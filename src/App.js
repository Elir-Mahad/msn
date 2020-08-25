import React, { useState, useEffect } from "react";
import Message from "./Message.js";
import "./App.css";

// material ui imports
// import { Button } from "@material-ui/core";
import { FormControl, Input } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

// firebase imports
import { db } from "./firebase.js";
import firebase from "firebase"; // pulling from the module not the file

// animation import from flipmove
import FlipMove from "react-flip-move";

//! -----------------------------------------------END OF IMPORTS

function App() {
	//! ALL USESTATE BELOW
	// state allows you to make a change on the page without refreshing the whole page
	// via the react dom

	const [input, setInput] = useState("");
	// (input) The constant input contains a string
	// (setInput) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()

	const [username, setUsername] = useState("");
	// (username) The constant username contains a string
	// (setUsername) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()

	const [messages, setMessages] = useState([]);
	// (messages) The constant messages contains a string
	// (setMessages) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()

	//! ----------FIRST USE EFFECT BELOW - UseEffect runs a piece of code based on a specific condition
	//! ----------This useEffect retrieves uploaded messages from the database

	useEffect(() => {
		// run once when the app component loads
		db
			// [a] enter the firebase database
			.collection("messages")
			//[b] get the messages inside firebase
			.orderBy("timestamp", "desc")
			// [c] order the posts based on timestamp in descending order (top post = most recent post)
			.onSnapshot((snapshot) => {
				// Use onsnapshot
				// Onsnapshot is a really powerful listener
				// every single time the data base changes in that collection,
				// every single time a document gets added, modified, changed inside a post,
				// a camera is going to take a snapshot of exactly what that data collection looks like
				setMessages(
					snapshot.docs.map((doc) => ({
						// from that snapshot, get all documents, map through every single document((snapshot.docs.map((doc))
						id: doc.id,
						// get the documents id  (in firebase database, the id is the number under the add document tab)
						message: doc.data()
						// get the document data (doc.data) --> data includes each docs properties and values (username, message, etc )
					}))
				);
			});
		return () => {
			// if there are any clean up actions insert them here
		};
		// the below line means: whenever the page refreshs, and the conditional is satisfied,
		// run this code only once when the app component loads, and don't run it again.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//! -----------SECOND USE EFFECT BELOW - UseEffect runs a piece of code based on a specific condition
	// ! -----------This useEffect gets the username from the user

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

	//! BELOW IS THE FUNCTION FOR STORING/MANAGING INPUTED MESSAGES, AND SENDING THESE MESSAGES TO THE FIREBASE DATABASE

	console.log(input);
	// this will show that the input is being recieved in the console

	console.log(messages);
	// this will show that
	// [a] all inputs are being stored in the 'messages' array
	// [b] new inputs are submitted, they are added to the end of inputs, which are already in the 'messages' array
	// [c] when the send message button is pressed, the input field is cleared and made blank

	const sendMessage = (event) => {
		// this function will be able to submit user message to the database to that specific post

		event.preventDefault();
		// By default, the input field gets refreshed every time something is submitted
		// This line of code stops the input field from refereshing.
		// As a result, the previous messages that were inputed, will not be erased.

		db
			// [a] enter the database
			.collection("messages")
			// [b] access the collection called messages
			.add({
				// add to the message
				message: input,
				// the message that was inputed
				username: username,
				// the username
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
				// the time the message was inputed
			});

		setInput("");
		// after send message is clicked,
		// clear the messages from the input,
		// and set the input field to be blank
	};

	return (
		<div className="App">
			<img
				src="https://facebookbrand.com/wp-content/uploads/2018/09/header-e1538151782912.png?w=too&h=100"
				alt=""
			/>
			<h1> Fb Messenger </h1>

			{/* input field */}
			<form className="app_form">
				<FormControl className="app_formControl">
					{/* input is from material ui */}
					<Input
						className="app_input"
						placeholder="Enter a message"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<IconButton
						className="app_iconButton"
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
						<SendIcon />
					</IconButton>
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
						// Adding the id ensures that react only refreshes new messages
						// For example: if you have 99 messages, and you add a new message,
						// then all 100 will not get refreshed when the page reloads.
						// Instead, react (via the virtual dom) is going to:
						// [a] keep the old messages on the page (without refreshing them)
						// [b] add the new message to the page
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
