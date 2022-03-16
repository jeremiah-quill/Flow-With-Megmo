export const registerMsg = (classDetails, link) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `<p>Hey yogi!  You have been successfully added to class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Click the link below 5 minutes before class starts.  See you soon!</p>  <br></br><br></br><p>${link}</p>`;
};

export const unregisterMsg = (classDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `<p>Hey yogi!  You have been successfully removed from class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  You will be missed!  Please allow up to 48 hours for us to refund your class fee via venmo.</p>`;
};

export const cancelClassMsg = (classDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `Oh snap!  Something came up and I need to cancel class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Please allow up to 48 hours for us to refund your class fee via venmo.  Check back for more classes soon!`;
};

export const newClassMsg = (classDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `Yay!  A new class has been added to the schedule on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Visit www.flowwithmegmo.com to register.  Hope to see you there!`;
};


export const updateClassMsg = (oldClassDetails, updatedClassDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = oldClassDetails;
    const { updatedDayOfWeek, updatedMonth, updatedDayOfMonth, updatedHour } = updatedClassDetails;

	return `Oh snap!  Something camp up and I had to make a change to the class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  The new class time will be ${updatedDayOfWeek}, ${updatedMonth}/${updatedDayOfMonth} @ ${updatedHour}.  If this new class time does not work for you, please login to www.flowwithmegmo.com and cancel your registration in the "manage classes" section.`;
};

// export const forgotPassword = {

// }

