import React from "react";

function ParticipantList({ participants }) {
	return (
		<ul className="participant-list">
			{participants.map((person, idx) => (
				<li key={idx} className="participant">
					{person.username} / {person.email}
				</li>
			))}
		</ul>
	);
}

export default ParticipantList;
