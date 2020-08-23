import React from "react";
import "./Message.css";

// material ui imports
import { Card, CardContent, Typography } from "@material-ui/core";

function Message({ message, username }) {
	//
	const isUser = username === message.username;
	// if the username is equivalent to the message.username then this will be true
	// this line makes sure that the message that's being displayed has the correct username next to it
	return (
		<div className={`message ${isUser && "message_user"}`}>
			{/* Every card will have the original styling from the class 'message',
                but if it is a user, we will add the new class 'message_user' .
                So only the person who is logged in will be able to get the class 'message_user'*/}
			<Card className={isUser ? "message_userCard" : "message_guestCard"}>
				{/* If its a user, then well give it the message_userCard class,
                    otherwise they get the guest_Card class */}
				<CardContent>
					<Typography color="white" variant="h5" component="h2">
						{message.username}:{message.message}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default Message;
