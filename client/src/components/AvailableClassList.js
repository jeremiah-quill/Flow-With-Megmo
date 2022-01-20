import React from "react";

function AvailableClassList(props) {
	const { classes, showCheckout } = props;


	return (
		<ul className="class-list">
			{classes.map((yogaClass, idx) => (
				<li key={idx} onClick={() => showCheckout(true)} className="class-item">
					{yogaClass.date} @ {yogaClass.time}
				</li>
			))}
		</ul>
	);
}

export default AvailableClassList;
