import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";

import config from "./config.json"
import Labels from "./Labels"
import Filaments from "./Filaments.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function App() {
    const [data, setData] = useState({filaments: []});
    const IP = config.ip;

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Filaments filaments={data.filaments}/>}/>
                <Route path={"/stitky"} element={<Labels filaments={data.filaments}/>}/>
                <Route path={"*"} element={<div
                    style={{
                        minHeight: "90vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5em"
                    }}>
                        <h1>Stránka sa nenašla</h1>
                        <h2 style={{fontWeight: 400}}>:(</h2>
                    </div>}>
                </Route>
            </Routes>
            <Footer/>
        </Router>
    );
}

// <div style={{minHeight: "100wh", display: "flex", justifyContent: "center", alignItems: "center"}}>
//     <h1>Stránka sa nenašla :(</h1>
// </div>
export default App;
