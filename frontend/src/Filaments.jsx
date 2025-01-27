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
    const [deleteFilamentID, setDeleteFilamentID] = useState(0)
    const [deleteFilamentURL, setDeleteFilamentURL] = useState("")

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments/`)
            .then((response) => {
                setfilaments(response.data.filaments)
            })
            .catch((error) => console.error(error))
    }, [IP]);

    return (
        <div className={"main flex flex-col items-center gap-16"}>
            <h1>Filamenty</h1>
            <div className={"grid grid-cols-5 gap-8"}>
                {filaments.map((item, key) => {
                    return (
                        <div className={
                            `flex flex-col gap-4 items-center p-6 custom-border 
                            ${item.weight <= item.weight_spool ? "opacity-40 grayscale-25 border-none shadow-none!" : "border"}`
                        } key={key}>
                            <img className={"clickable-small"} src={item.image_url} alt=""/>
                            <div className={"w-full flex flex-col items-center gap-1"}>
                                <p>{Math.max(item.weight - item.weight_spool, 0)} g left</p>
                                <div className="h-1.5 rounded-full"
                                     style={{
                                         backgroundImage: `linear-gradient(to right, ${item.color_hex}, ${item.color_second_hex || item.color_hex})`,
                                         width: `${Math.min((item.weight - item.weight_spool) / item.weight_orig, item.weight_orig) * 100}%`,
                                     }}
                                />
                            </div>
                            <div className={"w-full flex flex-col gap-1"}>
                                <div>
                                    <div className={"flex justify-between"}>
                                        <h2 className={"font-bold"}>{item.vendor}</h2>
                                        <h2 className={"font-extralight"}>#{item.id}</h2>
                                    </div>
                                    <h3 className={"font-semibold"}>{item.material}</h3>
                                </div>
                                <div className={"flex justify-between"}>
                                    <table className={"info-table"}>
                                        <tbody>
                                        <tr>
                                            <td>Temp</td>
                                            <td>: {item.temp_min} - {item.temp_max} °C</td>
                                        </tr>
                                        <tr>
                                            <td>Bed</td>
                                            <td>: {item.temp_bed_min} {item.temp_bed_max ? `- ${item.temp_bed_max}` : ""} °C</td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td>: {(item.price / (item.weight_orig / 1000)).toFixed(2)} €/kg</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className={"flex flex-col justify-end gap-1"}>
                                        <img className={"icon clickable"} src={"./src/images/edit.png"} alt=""
                                             onClick={() => navigate(`/filament/${item.id}`)}/>
                                        <img className={"icon clickable"} src={"./src/images/delete.png"} alt=""
                                             onClick={() => {
                                                 setShowDelete(true)
                                                 setDeleteFilamentID(item.id)
                                                 setDeleteFilamentURL(item.image_url)
                                             }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {showDelete &&
                    <DeleteFilament id={deleteFilamentID} image_url={deleteFilamentURL} setShowDelete={setShowDelete}/>}
            </div>
            <div className={"border clickable-small custom-border px-32 py-8"} onClick={() => navigate("/novy")}>
                <p className={"text-4xl font-light"}>+</p>
            </div>
        </div>
    )
}

export default Filaments