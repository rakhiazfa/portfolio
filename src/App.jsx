import React, { useEffect } from "react";
import Router from "./router";
import "aos/dist/aos.css";
import AOS from "aos";

function App() {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return <Router />;
}

export default App;
