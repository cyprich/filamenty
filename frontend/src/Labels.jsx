import {useEffect, useState} from "react";

import FilamentInfo from "./FilamentInfo.jsx";
import config from "./config.json"
import axios from "axios";

// TODO redo sizes with em units for printing

function Labels() {
    const IP = config.ip;
    const [filaments, setfilaments] = useState([])

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments`)
            .then((response) => {
                setfilaments(response.data.filaments)
            })
            .catch((error) => console.error(error))
    }, [IP]);

    return (
        <div className={"main"}>
            <h1 className={"no-print"}>Štítky</h1>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyItems: "center", gap: "32px 0"}}>
                {filaments.map((item, key) => (
                    <div key={key} style={{
                        scale: "0.9",
                        display: "flex",
                        alignItems: "center",
                        gap: "48px",
                        border: "1px solid black",
                        padding: "32px",
                        width: "max-content"
                    }}>
                        <div className={"label"} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1em",
                        }}>
                            <div style={{display: "flex", alignItems: "center", gap: "24px", width: "max-content"}}>
                                <div
                                    style={{
                                        background: `linear-gradient(135deg, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                        width: "72px",
                                        height: "72px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <div style={{display: "flex", flexDirection: "column", gap: "0px"}}>
                                    <h2>{item.material}
                                        <span className={"dimmed-text"}
                                              style={{paddingLeft: "16px",}}>#{item.id + 1}</span>
                                    </h2>
                                    <p>{item.vendor}</p>
                                </div>
                            </div>
                            <FilamentInfo item={item}/>
                        </div>
                        <img src={`http://${IP}:5000/api/images/qr/${item.id}.png`} alt=""
                             style={{width: "12em", height: "12em", padding: "16px"}}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Labels;

