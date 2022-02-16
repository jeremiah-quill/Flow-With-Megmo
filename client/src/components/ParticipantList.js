import React from "react";

function ParticipantList({ participants }) {
	console.log(participants)
	return (
		<ul className="participant-list">
			{participants.map((person, idx) => (
				<li key={idx} className="participant">
					Username: {person.username} Email:{person.email}
				</li>
			))}
		</ul>
	);
}

export default ParticipantList;
