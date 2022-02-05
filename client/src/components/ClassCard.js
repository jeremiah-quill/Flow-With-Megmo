export default function ClassCard({ date, time }) {
	return (
					<div className="card">
						<div className="card-content">
						<header className="card-header">Yoga Sculpt</header>
						<div className="card-day">{date}</div>
						<div className="card-month">{date}</div>
						{time ? <div className="card-time">{time}am</div> : ""}
						</div>
					</div>
	);
}
