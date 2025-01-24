import {useState, useEffect} from "react";
import axios from "axios";

import Labels from "./Labels"
import Filaments from "./Filaments.jsx";
import config from "./config.json"

function App() {
    const [data, setData] = useState({filaments: []});
    const IP = config.ip;

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments`)
            .then((response) => {setData(response.data)})
            .catch((error) => {console.log(error)})
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "8em", padding: "8em 8em 0 8em"}}>
            <h1 style={{fontSize: "64px", width: "max-content"}} className={"no-print"}>Filamenty</h1>
            <Filaments filaments={data.filaments}/>
            <h1 style={{fontSize: "64px", width: "max-content"}} className={"no-print"}>Štítky</h1>
            <Labels filaments={data.filaments}/>
        </div>
    );
}

export default App;
