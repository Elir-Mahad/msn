import React, { forwardRef } from "react";
// Flip move is a tool that will animate our message component
// It make it appear and disappear in a smooth manner
// Since we are going to use flipmove from react-flip-move, in the App.js
// react will need to keep track of the object thats flipping around.
// In order to do that we have to inser the react forward ref
// into a few different parts of the message component.

import "./Message.css";

// material ui imports
import { Card, CardContent, Typography } from "@material-ui/core";

// function Message({ message, username }) {
const Message = forwardRef(({ message, username }, ref) => {
	// Forward ref is an example of a higher order function.
	// Message as well is a function.
	// Since we are using flipmove to animate the message component,
	// We have to track the message component behavior.
	// We can accomplish this task by wrapping the whole message component with a forwardRef.
	const isUser = username === message.username;
	// if the username is equivalent to the message.username then this will be true
	// this line makes sure that the message that's being displayed has the correct username next to it
	return (
		<div ref={ref} className={`message ${isUser && "message_user"}`}>
			{/* Here we are attaching the ref, because we want to keep track of this whole div.
                The ref basically is tightening all of links and elements in the div,
                that way it can track and optimize the animation*/}
			{/* Also, Every card will have the original styling from the class 'message',
                but if it is a user, we will add the new class 'message_user' .
                So only the person who is logged in will be able to get the class 'message_user'*/}
			<Card className={isUser ? "message_userCard" : "message_guestCard"}>
				{/* If its a user, then well give it the message_userCard class,
                    otherwise they get the guest_Card class */}
				<CardContent>
					<Typography color="white" variant="h5" component="h2">
						{!isUser && `${message.username}: `}
						{/* If its not the user, then show the username. 
							If it is the user, don't show the username.
							This means that the user, when he is logged in, 
							won't see his name next to his message,
							because his messages will always be on the right.
							But he will see the names of other users, next to their messages,
							because all previous messages, of all different users, will be on the left.*/}
						{message.message}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
});

export default Message;
