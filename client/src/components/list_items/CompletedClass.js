import { useModalContext } from "../../utils/contexts/ModalContext";
import "../../styles/ClassCard.css";
import SpotifyPlayer from "../modals/SpotifyPlayer";
import parseDate from '../../utils/helpers/parseDate'


export default function CompletedClass({ classDate, playlistId }) {
	const { configureModal } = useModalContext();

	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(classDate);


	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">
					{dayOfWeek}, {month}/{dayOfMonth}
				</div>
				<div className="class-card-day">{hour}</div>
			</div>
			<div className="class-status">Completed</div>
			<div className="class-actions">
				{playlistId && (
					<button
						className="btn btn-round btn-pink"
						onClick={() =>
							configureModal(<SpotifyPlayer playlistId={playlistId} />)
						}
					>
						Playlist
					</button>
				)}
			</div>
		</div>
	);
}
