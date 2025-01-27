import {useEffect, useState} from "react";

import config from "./config.json"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Labels() {
    const IP = config.ip;
    const [filaments, setfilaments] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments/`)
            .then((response) => {
                setfilaments(response.data.filaments)
            })
            .catch((error) => console.error(error))
    }, [IP]);

    return (
        <div className={"main flex flex-col items-center"}>
            <h1>Štítky</h1>
            <div className={"grid grid-cols-4 gap-4"}>
                {filaments.map((item, key) => {
                    return (
                        <div className={"flex justify-between gap-8 w-max p-8 border"} key={key}>
                            <div className={"flex flex-col gap-3"}>
                                <div className={"flex gap-3 items-center"}>
                                    <div
                                        className={"w-12 h-12 rounded-full"}
                                        style={{backgroundImage: `linear-gradient(135deg, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`}}
                                    />
                                    <div>
                                        <p className={"text-xl flex gap-4 justify-between leading-5"}>
                                            <span className={"font-extrabold"}>{item.material}</span>
                                            <span className={"font-extralight"}>#{item.id}</span>
                                        </p>
                                        <p className={""}>{item.vendor}</p>
                                    </div>
                                </div>
                                <table className={"info-table"}>
                                    <tbody>
                                    <tr>
                                        <td>Temp:</td>
                                        <td>{item.temp_min} - {item.temp_max} °C</td>
                                    </tr>
                                    <tr>
                                        <td>Bed:</td>
                                        <td>{item.temp_bed_min} {item.temp_bed_max && `- ${item.temp_bed_max}`}°C</td>
                                    </tr>
                                    <tr>
                                        <td>Price:</td>
                                        <td>{(item.price || 0).toFixed(2)} €</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <img
                                className={"clickable-small w-32 h-32"} src={`http://${IP}:5000/api/images/qr/${item.id}.png/`}
                                onClick={() => navigate(`/filament/${item.id}`)}
                                alt=""
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Labels;