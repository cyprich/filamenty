import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "./config.json";
import EditFilament from "./EditFilament.jsx";
import DeleteFilament from "./DeleteFilament.jsx";

// TODO make user able to change color

function Filament() {
    const IP = config.ip;
    const {id} = useParams();

    const [filament, setfilament] = useState([])
    const [responseCode, setResponseCode] = useState(0)

    const [showDelete, _setShowDelete] = useState(false)

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments/${id}/`)
            .then((response) => {
                setfilament(response.data.filaments)
                setResponseCode(response.status)
            })
            .catch((error) => console.error(error))
    }, [IP, id]);

    function setShowDelete(state) {
        _setShowDelete(!showDelete);
        _setShowDelete(state)
    }

    return (
        <div className={"main filament flex flex-col gap-8"}>
            {
                responseCode === 200
                    ?
                    <>
                        <div className={"flex items-center !gap-8"}>
                            <img className={"h-24"} src={`http://${IP}:5000/api/images/qr/${id}.png`} alt=""/>
                            <div>
                                <div className={"flex gap-3"}>
                                    <h2 className={"!text-3xl font-bold"}>{filament.vendor}</h2>
                                    <h2 className={"!text-3xl font-extralight"}>#{filament.id}</h2>
                                </div>
                                <h2 className={"font-medium"}>{filament.material}</h2>
                            </div>
                        </div>
                        <div
                            style={{background: `linear-gradient(to right, ${filament.color_hex}, ${filament.color_second_hex || filament.color_hex})`}}
                            className={"w-full h-1 rounded-full -mt-2"}
                        />
                        <div className={"flex gap-16"}>
                            <img src={filament.image_url} className={"border custom-border w-128 h-128 p-8"} alt=""/>
                            <div className={"w-full flex flex-col gap-4"}>
                                <div className={"flex flex-col gap-3"}>
                                    <h2>Informácie</h2>
                                    <table className={"info-table w-max"}>
                                        <tbody>
                                        <tr>
                                            <td>Minimálna teplota tlače</td>
                                            <td>{filament.temp_min} °C</td>
                                            <EditFilament id={id} fieldName={"temp_min"}/>
                                        </tr>
                                        <tr>
                                            <td>Maximálna teplota tlače</td>
                                            <td>{filament.temp_max} °C</td>
                                            <EditFilament id={id} fieldName={"temp_max"}/>
                                        </tr>
                                        <tr>
                                            <td>{filament.temp_bed_max ? "Minimálna t" : "T"}eplota podložky</td>
                                            <td>{filament.temp_bed_min} °C</td>
                                            <EditFilament id={id} fieldName={"temp_bed_min"}/>
                                        </tr>
                                        {
                                            filament.temp_bed_max && <tr>
                                                <td>Maximálna teplota podložky</td>
                                                <td>{filament.temp_bed_max} °C</td>
                                                <EditFilament id={id} fieldName={"temp_bed_max"}/>
                                            </tr>
                                        }
                                        <tr>
                                            <td><b>Zostávajúca hmotnosť</b></td>
                                            <td><b>{Math.max(filament.weight - filament.weight_spool, 0)} g</b></td>
                                            <EditFilament id={id} fieldName={"weight_full"}
                                                          additional_data={filament.weight_spool}/>
                                        </tr>
                                        <tr>
                                            <td>Hmotnosť so spoolom</td>
                                            <td>{filament.weight} g</td>
                                            <EditFilament id={id} fieldName={"weight"}/>
                                        </tr>
                                        <tr>
                                            <td>Hmotnosť spoolu</td>
                                            <td>{filament.weight_spool} g</td>
                                            <EditFilament id={id} fieldName={"weight_spool"}/>
                                        </tr>
                                        <tr>
                                            <td>Pôvodná hmotnosť</td>
                                            <td>{filament.weight_orig} g</td>
                                            <EditFilament id={id} fieldName={"weight_orig"}/>
                                        </tr>
                                        <tr>
                                            <td>Cena</td>
                                            <td>{(filament.price || 0).toFixed(2)} €</td>
                                            <EditFilament id={id} fieldName={"price"}/>
                                        </tr>
                                        {
                                            filament.weight_orig !== 1000 && <tr>
                                                <td>Cena za 1kg</td>
                                                <td>{(filament.price / (filament.weight_orig / 1000)).toFixed(2)} €/kg</td>
                                                <EditFilament id={id} fieldName={"price_kg"}
                                                              additional_data={filament.weight_orig}/>
                                            </tr>
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td style={{
                                                // display: "flex",
                                                // alignItems: "center",
                                                // gap: "4px",
                                                // marginTop: "16px",
                                                // padding: "0",
                                            }}
                                                className={"flex justify-center items-center gap-2 mt-2 cursor-pointer border rounded-lg border-red-600 hover:bg-red-600/10 select-none"}
                                                onClick={() => {
                                                    setShowDelete(true)
                                                }}>
                                                <img className={"w-8 -ml-2"} src="/src/images/delete_red.png" alt=""/>
                                                <p>Odstrániť</p>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                    <div>
                                    </div>
                                </div>
                                {
                                    showDelete &&
                                    <DeleteFilament id={filament.id} image_url={filament.image_url}
                                                    setShowDelete={setShowDelete}/>
                                }
                            </div>
                        </div>
                    </>
                    : <div className={"flex flex-col justify-center gap-3 pt-32 text-center"}>
                        <h2 className={"!text-4xl font-bold"}>Filament sa nenašiel</h2>
                        <h2 className={"!text-3xl pb-2 font-semibold"}>:(</h2>
                        <p>Pravdepodobne ste zadali zlé číslo filamentu</p>
                    </div>
            }
        </div>
    )
}

export default Filament;