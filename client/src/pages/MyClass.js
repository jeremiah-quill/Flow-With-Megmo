import React from "react";
import Footer from "../components/Footer";

function MyClass() {
	return (
		<div className="yoga-blocks-hero">
			<section className="hero-section">
				<h2 className="section-title yoga-blocks-title text-container-h2">
					What is yoga sculpt?
				</h2>

				<p className="section-content yoga-blocks-content text-container-p">
					My classes are typically an hour long with a carefully crafted blend
					of stretching, breathing, strengthening, and cardio. The goal is to
					get your heart pumping, but my mantra is always "go at your own pace".
					All set to an upbeat, curated playlist (by yours truly) to match the
					movements and mood of class.<br></br>
					<br></br>You deserve to take this time for yourself, believe me, I
					know how challenging it is to find the time. Don't think of this as
					yoga, think of this as YOUga!
				</p>
				<Footer />

			</section>
		</div>
	);
}

export default MyClass;
