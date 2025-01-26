import axios from "axios"
import {useEffect} from "react";

import config from "./config.json";
import {useNavigate} from "react-router-dom";

function DeleteFilament({id, image_url, setShowDelete}) {
    const IP = config.ip

    let navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, []);

    function handleDelete() {
        axios.delete(`http://${IP}:5000/api/filaments/${id}/`)
            .then((response) => {
                    console.log(response);
                    navigate("/");
                    window.location.reload();
                }
            )
            .catch((error) => console.error(error))
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0, 0.8)"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1em",
                padding: "32px",
                backgroundColor: "white",
                outline: "1px solid white",
                outlineOffset: "8px"
            }} className={"custom-border"}>
                <h2>Odstrániť?</h2>
                <img src={image_url} alt="" style={{width: "16em", height: "auto"}}/>
                <div style={{textAlign: "center"}}>
                    <p>Naozaj si prajete odstrániť tento filament?</p>
                    <p>Tento krok sa nedá vrátiť späť</p>
                </div>
                <div style={{display: "flex", gap: "1em"}}>
                    <button onClick={() => handleDelete()}>Odtrániť</button>
                    <button onClick={() => setShowDelete(false)}>Zrušiť</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteFilament;