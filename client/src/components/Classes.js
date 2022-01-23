import React, { useState } from "react";
import BraintreeDropIn from "./BraintreeDropIn";
import AvailableClassList from "./AvailableClassList";
import BackButton from "./BackButton";

function Classes() {
	let data = [{ date: "2022-01-29", time: "10:00" }, { date: "2022-01-22", time: "10:30" }, { date: "2022-02-5", time: "10:00" }];

	const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
	const [availableClasses, setAvailableClasses] = useState(data);
	return (
		<div className="classes">
			<BackButton />
			
			{!showBraintreeDropIn && (
				<div>
					<header>
						Classes are $15 each. After submitting payment you will receive an
						email with your class zoom link!
					</header>
                    <AvailableClassList classes={availableClasses} showCheckout={setShowBraintreeDropIn}/>
				</div>
			)}
			<BraintreeDropIn
				show={showBraintreeDropIn}
				onPaymentCompleted={() => {
					setShowBraintreeDropIn(false);
				}}
			/>
		</div>
	);
}

export default Classes;
