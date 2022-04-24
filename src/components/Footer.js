import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <p>This React app was made possible thanks to the Coingecko API</p>
            <p>
                You can visit them at{" "}
                <a
                    href="https://www.coingecko.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    https://www.coingecko.com
                </a>
            </p>
        </div>
    );
}
export default Footer;
