import React, {useState} from "react";
import Footer from "../components/Footer";

function BookPrivate() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    // TODO: actually send the message to flowwithmegmo@gmail.com with return address set as email
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted!')
        setEmail("");
        setMessage("")
    }

	return (
        <div className="book-private-hero">
		<div className="main-section book-private-section">
            <div className="book-private-section-hero"></div>
			<h1 className="coming-soon">Coming Soon!</h1>
		{/* <form className="contact-form" onSubmit={handleSubmit}>
			<input className="contact-email-input" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"/>
			<textarea className="contact-message-input" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Message"/>
            <input className="contact-submit btn btn-green" type="submit"/> 
		</form> */}
        {/* <Footer /> */}
        <Footer />

		</div>


        </div>
	);}

export default BookPrivate;
