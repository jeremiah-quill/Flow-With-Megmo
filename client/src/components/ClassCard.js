import '../styles/ClassCard.css'

export default function ClassCard({ date, price }) {
	return (
					<div className="class-card">
						<div className="class-card-content">
						{/* <header className="card-header">Yoga Sculpt</header> */}
						<div className="class-card-day">{date}</div>
						{/* {time ? <div className="class-card-time">{time}am</div> : ""} */}
						{price ? <div className="class-card-price">{price}</div> : ""}
						</div>
					</div>
	);
}
