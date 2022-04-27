import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar(props) {
	return (
		<nav className="navbar">
			<Link to="/crypto-info/">
				<button className="homeBtn">Home</button>
			</Link>
			<Link to="/crypto-info/">
				<h1>Crypto Info</h1>
			</Link>
		</nav>
	);
}

export default NavBar;
