export const registerMsg = (classDetails, link) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `You have registered for a Flow with Megmo virtual yoga class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Please use the following link and join 5 minutes before class starts: ${link}.  I can't wait to see you in class!`;
};

export const unregisterMsg = (classDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `You have unregistered for a Flow with Megmo virtual yoga class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Please allow up to 48 hours for us to refund your class fee via venmo.  We are going to miss you!`;
};

export const cancelClassMsg = (classDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = classDetails;
	return `I apologize but I need to cancel class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  Please allow up to 48 hours for us to refund your class fee via venmo.`;
};


export const updateClassMsg = (oldClassDetails, updatedClassDetails) => {
	const { dayOfWeek, month, dayOfMonth, hour } = oldClassDetails;
    const { updatedDayOfWeek, updatedMonth, updatedDayOfMonth, updatedHour } = updatedClassDetails;

	return `I apologize but I need to update class on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}.  The new class time will be ${updatedDayOfWeek}, ${updatedMonth}/${updatedDayOfMonth} @ ${updatedHour}   If this new class time does not work for you, please unregister for class on your profile page at www.flowwithmegmo.com`;
};

// export const forgotPassword = {

// }

