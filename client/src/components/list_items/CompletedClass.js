import { useModalContext } from "../../utils/contexts/ModalContext";
import "../../styles/ClassCard.css";
// import { useUserContext } from "../../utils/contexts/UserContext";
// import SpotifyModal from "../modals/SpotifyModal";
import SpotifyPlayer from "../modals/SpotifyPlayer";

export default function CompletedClass({ classDate, playlistId }) {
	const { configureModal } = useModalContext();

	// TODO: abstract this into a function to be able to use on student page, class schedule, and dashboard
	const classDateStamp = new Date(classDate);
	const dayOfMonth = classDateStamp.toLocaleString("en-US", { day: "2-digit" });
	const month = classDateStamp.toLocaleString("en-US", { month: "2-digit" });
	const dayOfWeek = classDateStamp.toLocaleString("en-US", { weekday: "long" });
	const hour = classDateStamp.toLocaleTimeString("en-US", {
		timeStyle: "short",
	});

	return (
		<div className="class-list-item">
			<div className="class-card-content">
				<h2 className="card-header">Flow with Megmo</h2>
				<div className="class-card-day">
					{dayOfWeek}, {month}/{dayOfMonth}
				</div>
				<div className="class-card-day">{hour}</div>
			</div>
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
