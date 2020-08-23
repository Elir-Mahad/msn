import React from "react";
import "./Message.css";

// material ui imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Message(props) {
	return (
		<div>
			<Card>
				<CardContent>
					<Typography color="white" variant="h5" component="h2">
						{props.text}
					</Typography>
				</CardContent>
			</Card>
			<h2>
				{props.username}:{props.text}
			</h2>
		</div>
	);
}

export default Message;
