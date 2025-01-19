import {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/filaments")
            .then((response) => {setData(response.data)})
            .catch((error) => {console.log(error)})
    }, []);

    console.log(data)

    return (
        <>
            <h1>Filaments</h1>
        </>
    );
}

export default App;
