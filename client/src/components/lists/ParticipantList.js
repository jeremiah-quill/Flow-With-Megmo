import React from "react";

function ParticipantList({ participants }) {
	return (
		<ul className="participant-list">
			{participants.map((person, idx) => (
				<li key={idx} className="participant">
					<div>{idx + 1}.</div>
					<div className="participant-details">
						<div>{person.username}</div>
						<div>{person.email}</div>
					</div>
				</li>
			))}
		</ul>
	);
}

export default ParticipantList;
