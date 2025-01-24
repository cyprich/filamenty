import {useState, useEffect} from "react";
import axios from "axios";

import Labels from "./Labels"
import Filaments from "./Filaments.jsx";

function App() {
    const [data, setData] = useState({filaments: []});

    useEffect(() => {
        axios.get("http://localhost:5000/api/filaments")
            .then((response) => {setData(response.data)})
            .catch((error) => {console.log(error)})
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "8em", padding: "8em 8em 0 8em"}}>
            <h1 style={{fontSize: "64px", width: "max-content"}}>Filamenty</h1>
            <Filaments filaments={data.filaments}/>
            <h1 style={{fontSize: "64px", width: "max-content"}}>Štítky</h1>
            <Labels filaments={data.filaments}/>
        </div>
    );
}

export default App;
