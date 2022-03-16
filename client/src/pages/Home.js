import React, { useEffect, useState } from "react";
import UserButtons from "../components/UserButtons";
import Footer from "../components/Footer";
import HowItWorks from "./HowItWorks";
import { currentUser } from "../utils/contexts/UserContext";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";
import AddEmailForm from "../components/forms/AddEmailForm";

function Home() {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();
	const [isOpen, setIsOpen] = useState(true)

	const closeForm = () => {
		setIsOpen(false)
	}

	useEffect(() => {
		!currentUser.loggedIn ? setIsOpen(true) : setIsOpen(false)
	}, [])


	return (
		<div className="main-container">
			<AddEmailForm isOpen={isOpen} closeForm={closeForm}/>
			<header className="main-header">
				<div className="hero">
					<div className="hero-content">
						<h1 className="hero-title">Flow with Megmo</h1>
						{/* <div className="title-btns">
							<UserButtons />
						</div> */}
					</div>
				</div>
			</header>
			<div className="main">
				<section className="main-section my-story-section">
					<div className="my-story-content-container inner-container">
						<h2 className="section-title">My Story</h2>
						<img className="my-img" src="megmo-yoga2compressed.png" />

						<p className="my-story-content section-content">
							Hi! I'm Megmo, but you probably knew that &#9996;. I grew up a
							competitive dancer and have always made fitness an important part
							of my life. In 2017 I found yoga sculpt as a practice and it was
							love at first sight. I was completely obsessed with the way it
							incorporated strength & breath (yoga) and power & toning (sculpt).
							For me, it's a full body, full mind workout and I always leave my
							mat feeling energized and accomplished. <br></br>
							<br></br>In 2018 I completed Yoga Sculpt teacher training through
							Corepower Yoga in Boston and began teaching in 2019. From the mat
							in the back, to front & center, I quickly realized leading this
							practice was my passion. This is where I feel at home. <br></br>
							<br></br>Between a pandemic, a baby, and lots of life in between,
							I stepped away from teaching in the studio. I started this
							platform to reconnect with my passion of guiding students through
							this practice in a larger way. Near or far, yogis are welcome to
							spend 1 hr with me, sweating & striving towards something bigger
							than themselves.
							{/* <br></br>
							<br></br>Namaste */}
						</p>
					</div>
				</section>
				<section className="yoga-blocks-img">
					<div className="inner-container">
						<h2 className="section-title yoga-blocks-title">
							What is yoga sculpt?
						</h2>

						<p className="section-content yoga-blocks-content text-container-p">
							My classes are typically an hour long with a carefully crafted
							blend of stretching, breathing, strengthening, and cardio. The
							goal is to get your heart pumping, but my mantra is always "go at
							your own pace". All set to an upbeat, curated playlist (by yours
							truly) to match the movements and mood of class.<br></br>
							<br></br>You deserve to take this time for yourself, and believe
							me, I know how challenging it is to find the time. Don't think of
							this as yoga, think of this as YOUga!
						</p>
					</div>
				</section>
				<section className="main-section how-it-works-section">
					<HowItWorks />
				</section>
				<section className="book-private-section">
					<h1 className="coming-soon inner-container">
						Private bookings coming soon!
					</h1>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
