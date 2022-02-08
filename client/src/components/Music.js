import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ClassCard from "./ClassCard";
import { QUERY_CLASSES } from '../utils/queries';
import { useQuery } from '@apollo/client';

// TODO: should I get this data from centralized state, call database directly from useEffect, or should it be passed in by App component?
const data = [
	{ date: "2022-01-29", time: "10:00", playlistId: "33c84T8rITyYEY63gfzPZH" },
	{ date: "2022-01-22", time: "10:30", playlistId: "1FiXOS4iAVB3aYCEU71XRC" },
	{ date: "2022-02-5", time: "10:00", playlistId: "6itkGetLQesAPNyUb9x276" },
];
function Music() {
	// const [playlists , setPlaylists] = useState([])

	const { loading, data } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];


	// useEffect(()=> {
	// 	// retrieve playlists from DB
	// 	// set playlists to state
	// }, [])

	return (
		<div className="music">
						{/* <header>Previous Classes</header> */}

			{/* <Button path={"/"} /> */}
			{/* <div> */}
				<ul className="class-list">
					{classes.map((yogaClass, idx) => (
						<li key={idx} className="class-list-item">
							<Link to={`/music/${yogaClass.playlistId}`}>
								<ClassCard date={yogaClass.date} />
							</Link>
						</li>
					))}
				</ul>
			{/* </div> */}
		</div>
	);
}

export default Music;
