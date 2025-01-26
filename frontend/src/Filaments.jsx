import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import config from "./config.json"
import DeleteFilament from "./DeleteFilament.jsx";

function Filaments() {
    const navigate = useNavigate();

    const IP = config.ip;
    const [filaments, setfilaments] = useState([])

    const [showDelete, setShowDelete] = useState(false)
    const [deleteFilamentURL, setDeleteFilamentURL] = useState("")

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments/`)
            .then((response) => {
                setfilaments(response.data.filaments)
            })
            .catch((error) => console.error(error))
    }, [IP]);

    return (
        <div className={"main"}>
            <h1>Filamenty</h1>
            <div
                style={{display: "grid", justifyContent: "center", gridTemplateColumns: "repeat(5, 1fr)", gap: "32px"}}>
                {filaments.map((item, key) => {
                    return (
                        <div key={key} className={"filaments-item custom-border"} style={{
                            filter: `grayscale(${item.weight <= item.weight_spool ? "0.5" : "0"}) opacity(${item.weight <= item.weight_spool ? "0.5" : "1"})`,
                            borderWidth: `${item.weight <= item.weight_spool ? "0" : ""}`,
                            scale: `${item.weight <= item.weight_spool ? "0.9" : "1"}`
                        }}>
                            <img
                                style={{width: "100%", aspectRatio: "auto", borderRadius: "inherit", cursor: "pointer"}}
                                src={item.image_url} alt=""
                                onClick={() => navigate(`/filament/${item.id}`)}/>
                            <div
                                style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <p style={{
                                    width: "max-content",
                                    paddingBottom: "4px"
                                }}>{Math.max(item.weight - item.weight_spool, 0)} g left</p>
                                <div style={{
                                    width: `${Math.min((item.weight - item.weight_spool) / item.weight_orig, item.weight_orig) * 0.8 * 100}%`,
                                    height: "4px",
                                    background: `linear-gradient(to right, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                    marginBottom: "-8px"
                                }}/>
                            </div>
                            <div style={{width: "95%"}}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>{item.vendor}</h2>
                                    <h2 className={"dimmed-text"}>#{item.id}</h2>
                                </div>
                                <h3 style={{fontWeight: "500"}}>{item.material}</h3>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
                                    <table className={"filament-info"}>
                                        <tbody>
                                        <tr>
                                            <td>Temp</td>
                                            <td> : {item.temp_min} - {item.temp_max} °C</td>
                                        </tr>
                                        <tr>
                                            <td>Bed</td>
                                            <td> : {item.temp_bed_min} {item.temp_bed_max ? `- ${item.temp_bed_max}` : ""} °C</td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td> : {(item.price / (item.weight_orig / 1000)).toFixed(2)} €/kg</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className={"filaments-buttons"} style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "end",
                                        gap: "8px"
                                    }}>
                                        <img src={"./src/images/edit.png"} alt=""
                                             onClick={() => navigate(`/filament/${item.id}`)}/>
                                        <img src={"./src/images/delete.png"} alt="" onClick={() => {
                                            setShowDelete(true)
                                            setDeleteFilamentURL(item.image_url)
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {showDelete && <DeleteFilament image_url={deleteFilamentURL} setShowDelete={setShowDelete} />}
            </div>
            <div className={"filaments-item custom-border plus"}>+</div>
        </div>
    )
}

export default Filaments