import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import FilamentInfo from "./FilamentInfo.jsx";
import config from "./config.json"

function Filaments() {
    const IP = config.ip;
    const [filaments, setfilaments] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments`)
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
                            filter: `grayscale(${item.weight === 0 ? "100" : "0"}) opacity(${item.weight === 0 ? "0.5" : "1"})`,
                            borderWidth: `${item.weight === 0 ? "0" : ""}`,
                            scale: `${item.weight === 0 ? "0.9" : "1"}`
                        }}>
                            <img
                                style={{width: "100%", aspectRatio: "auto", borderRadius: "inherit", cursor: "pointer"}}
                                src={`http://${IP}:5000/api/images/filamenty/${item.id}.png`} alt=""
                                onClick={() => navigate(`/filament/${item.id + 1}`)}/>
                            <div
                                style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <p style={{
                                    width: "max-content",
                                    paddingBottom: "4px"
                                }}>{Math.max(item.weight - item.weight_spool, 0)} g left</p>
                                <div style={{
                                    // width: "90%",
                                    width: `${(item.weight - item.weight_spool) / item.weight_orig * 100}%`,
                                    height: "4px",
                                    background: `linear-gradient(to right, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                    marginBottom: "-8px"
                                }}/>
                            </div>
                            <div style={{width: "95%"}}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>{item.vendor}</h2>
                                    <h2 className={"dimmed-text"}>#{item.id + 1}</h2>
                                </div>
                                <h3 style={{fontWeight: "500"}}>{item.material}</h3>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
                                    <FilamentInfo item={item}/>
                                    <div className={"filaments-buttons"} style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "end",
                                        gap: "8px"
                                    }}>
                                        <img src={"./src/images/edit.png"} alt=""
                                             onClick={() => navigate(`/filament/${item.id + 1}`)}/>
                                        <img src={"./src/images/delete.png"} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={"filaments-item custom-border plus"}>+</div>
        </div>
    )
}

export default Filaments