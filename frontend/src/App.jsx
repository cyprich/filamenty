import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";

import Labels from "./Labels"
import Filaments from "./Filaments.jsx";
import config from "./config.json"

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
            <Routes>
                <Route path={"/"} element={<Filaments filaments={data.filaments}/>}/>
                <Route path={"/stitky"} element={<Labels filaments={data.filaments}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
