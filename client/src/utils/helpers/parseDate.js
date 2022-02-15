export default function parseDate(date) {
	let classDate = new Date(date);
	const dayOfMonth = classDate.toLocaleString("en-US", { day: "2-digit" });
	const month = classDate.toLocaleString("en-US", { month: "2-digit" });
	const dayOfWeek = classDate.toLocaleString("en-US", { weekday: "long" });
	const hour = classDate.toLocaleTimeString("en-US", { timeStyle: "short" });

	return { dayOfMonth, month, dayOfWeek, hour };
}
