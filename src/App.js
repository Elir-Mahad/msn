import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { FormControl, InputLabel, Input } from "@material-ui/core";

import "./App.css";

function App() {
	//! USESTATE
	// state allows you to make a change on the page without refreshing the whole page
	// via the react dom

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
		event.preventDefault();
		// By default, the input field gets refreshed every time something is submitted
		// This line of code stops the input field from refereshing.
		// As a result, the previous messages that were inputed, will not be erased.

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
			<form>
				<FormControl>
					<InputLabel>Enter a message</InputLabel>
					{/* input */}
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

			{messages.map((message) => (
				// loop through the messages array and
				<p>{message}</p>
				// display each message in the messages array
			))}
		</div>
	);
}

export default App;
