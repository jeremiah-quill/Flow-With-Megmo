import React from "react";

function ParticipantList({ participants }) {
	return (
		<ul className="participant-list">
			{participants.map((person, idx) => (
				<li key={idx} className="participant">
					{person.firstName} {person.lastName} / {person.email}
				</li>
			))}
		</ul>
	);
}

export default ParticipantList;
