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
        <>
            <h1>Filaments</h1>
            <Labels filaments={data.filaments}/>
        </>
    );
}

export default App;
