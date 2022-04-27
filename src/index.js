import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import NavBar from "./components/NavBar";
import Crypto from "./components/Crypto";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="crypto" element={<Crypto />}>
                <Route path=":id" element={<Crypto />} />
            </Route>
        </Routes>
        <Footer />
    </BrowserRouter>
);
