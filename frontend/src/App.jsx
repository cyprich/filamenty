import {useState, useEffect} from "react";
import axios from "axios";

import Labels from "./Labels"

function App() {
    const [data, setData] = useState({filaments: []});

    useEffect(() => {
        axios.get("http://localhost:5000/api/filaments")
            .then((response) => {setData(response.data)})
            .catch((error) => {console.log(error)})
    }, []);

    return (
        <div style={{padding: "32px"}}>
            <h1 style={{paddingBottom: "0.5em"}}>Filaments</h1>
            <Labels filaments={data.filaments}/>
        </div>
    );
}

export default App;
