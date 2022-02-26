import React from "react";
import SignupModal from "../components/modals/SignupModal";
import LoginModal from "../components/modals/LoginModal";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";

import calendar from "../images/calendar.png";
import dollarSymbol from "../images/dollar-symbol.png";
import user from "../images/user.png";
import Footer from "../components/Footer";

function HowItWorks() {
	const { configureModal } = useModalContext();
	const { currentUser } = useUserContext();

	return (
		<div className="how-it-works-hero">
			<section className="hero-section">
				<h2 className="section-title text-container-h2">How does this work?</h2>
				<div className="how-it-works-container section-content">
					<div className="how-it-works-item">
						<img className="how-it-works-icon" src={user} />
						{currentUser.loggedIn ? (
							<p>Step 1 complete!  You're already signed in with an email. </p>
						) : (
							<p>
								Login&nbsp; 
								<span className="link-span">
									<button
										className="how-it-works-btn"
										onClick={() => configureModal(<LoginModal />)}
									>
										here
									</button>
								</span>
								&nbsp;or signup&nbsp; 
								<span className="link-span">
									<button
										className="how-it-works-btn"
										onClick={() => configureModal(<SignupModal />)}
									>
									here
									</button>
								</span>
								.
							</p>
						)}
						{/* <br></br>
						I know it's annoying to use your real email account, but it's how we send
						out class links and any information you may need along the way! */}
					</div>
					<p className="how-it-works-item">
						<img className="how-it-works-icon" src={calendar} />
						Find a date and time that works for you and book your class from
						your account page. You will be sent an email confirmation and zoom
						link.
					</p>
					<p className="how-it-works-item">
						<img className="how-it-works-icon" src={dollarSymbol} />
						After booking you will see a prompt with instructions on how to pay
						the class fee. Please try to pay this fee before class so we can
						admit you!
					</p>
				</div>
			</section>
		</div>
	);
}

export default HowItWorks;
