// Axios is a popular NPM package used for preforming API requests
import axios from "axios";

const { REACT_APP_BASEURL, REACT_APP_APIKEY } = process.env;

// Zoom
const zoomHeaders = {
	Authorization: "Bearer my-token",
	"Content-Type": "application/json",
};

// create class
const zoomCreate = async (data) => {
	const response = await axios.post(`/api/zoom/create-class`, data, {
		zoomHeaders,
	});

	const newClassDetails = response.data;

	return JSON.stringify(newClassDetails);
};

// create class
const zoomJoin = (data) => {
	return axios.post(`/api/zoom/join-class`, data, { zoomHeaders });
};

// delete class
const zoomDelete = (data) => {
	return axios.post(`/api/zoom/delete-class`, data, { zoomHeaders });
};

// edit class
const zoomEdit = (data) => {
	return axios.post(`/api/zoom/edit-class`, data, { zoomHeaders });
};

// get spotify token
// TODO: error handling
const spotifyToken = () => {
	return axios("https://accounts.spotify.com/api/token", {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				btoa(
					"6e4383b4262d4a5cb41c9e0e90f9e100" +
						":" +
						"864f85c84587428b8871708915e1f2c7"
				),
		},
		data: "grant_type=client_credentials",
		method: "POST",
	});
};

// use spotify token to get playlists
// TODO: error handling
const teacherPlaylists = (token) => {
	return axios("https://api.spotify.com/v1/users/mmm5660/playlists?limit=50", {
		headers: { Authorization: "Bearer " + token.data.access_token },
	});
};

export {
	zoomCreate,
	zoomJoin,
	spotifyToken,
	teacherPlaylists,
	zoomDelete,
	zoomEdit,
};