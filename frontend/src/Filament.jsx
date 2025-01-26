import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "./config.json";
import EditFilament from "./EditFilament.jsx";

function Filament() {
    const IP = config.ip;
    const {id} = useParams();

    const [filament, setfilament] = useState([])
    const [responseCode, setResponseCode] = useState(0)

    useEffect(() => {
        axios.get(`http://${IP}:5000/api/filaments/${id}/`)
            .then((response) => {
                setfilament(response.data.filaments)
                setResponseCode(response.status)
            })
            .catch((error) => console.error(error))
    }, [IP, id]);

    return (
        <div className={"filament"}
             style={{display: "flex", gap: "40px", padding: "6em 8em", maxWidth: "90vw", minHeight: "70vh"}}>
            {
                responseCode === 200
                    ?
                    <>
                        <img src={filament.image_url}
                             style={{width: "512px", height: "512px", border: "1px solid black", padding: "32px"}}
                             className={"custom-border"} alt=""/>
                        <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "16px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
                                <div>
                                    <h1>{filament.vendor}<span style={{paddingLeft: "12px"}}
                                                               className={"dimmed-text"}>#{filament.id}</span></h1>
                                    <h1 style={{fontWeight: 500}}>{filament.material}</h1>
                                </div>
                                <img src={`http://${IP}:5000/api/images/qr/${id}.png`} alt=""
                                     style={{height: "6em"}}/>
                            </div>
                            <div style={{
                                width: "100%",
                                height: "4px",
                                background: `linear-gradient(to right, ${filament.color_hex}, ${filament.color_second_hex || filament.color_hex})`
                            }}/>
                            <div>
                                <h2 style={{fontWeight: 400, paddingBottom: "0.5em"}}>Informácie</h2>
                                <table className={"filament-info"}>
                                    <tbody>
                                    <tr>
                                        <td>Minimálna teplota tlače</td>
                                        <td>: {filament.temp_min} °C</td>
                                        <EditFilament id={id} fieldName={"temp_min"}/>
                                    </tr>
                                    <tr>
                                        <td>Maximálna teplota tlače</td>
                                        <td>: {filament.temp_max} °C</td>
                                        <EditFilament id={id} fieldName={"temp_max"}/>
                                    </tr>
                                    <tr>
                                        <td>{filament.temp_bed_max ? "Minimálna t" : "T"}eplota podložky</td>
                                        <td>: {filament.temp_bed_min} °C</td>
                                        <EditFilament id={id} fieldName={"temp_bed_min"}/>
                                    </tr>
                                    {
                                        filament.temp_bed_max && <tr>
                                            <td>Maximálna teplota podložky</td>
                                            <td>: {filament.temp_bed_max} °C</td>
                                            <EditFilament id={id} fieldName={"temp_bed_max"}/>
                                        </tr>
                                    }
                                    <tr>
                                        <td><b>Zostávajúca hmotnosť</b></td>
                                        <td><b>: {Math.max(filament.weight - filament.weight_spool, 0)} g</b></td>
                                        <EditFilament id={id} fieldName={"weight_full"} additional_data={filament.weight_spool}/>
                                    </tr>
                                    <tr>
                                        <td>Hmotnosť so spoolom</td>
                                        <td>: {filament.weight} g</td>
                                        <EditFilament id={id} fieldName={"weight"}/>
                                    </tr>
                                    <tr>
                                        <td>Hmotnosť spoolu</td>
                                        <td>: {filament.weight_spool} g</td>
                                        <EditFilament id={id} fieldName={"weight_spool"}/>
                                    </tr>
                                    <tr>
                                        <td>Pôvodná hmotnosť</td>
                                        <td>: {filament.weight_orig} g</td>
                                        <EditFilament id={id} fieldName={"weight_orig"}/>
                                    </tr>
                                    <tr>
                                        <td>Cena</td>
                                        <td>: {(filament.price || 0).toFixed(2)} €</td>
                                        <EditFilament id={id} fieldName={"price"}/>
                                    </tr>
                                    {
                                        filament.weight_orig !== 1000 && <tr>
                                            <td>Cena za 1kg</td>
                                            <td>: {(filament.price / (filament.weight_orig / 1000)).toFixed(2)} €/kg</td>
                                            <EditFilament id={id} fieldName={"price_kg"} additional_data={filament.weight_orig}/>
                                        </tr>
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            marginTop: "16px",
                                            padding: "0",
                                        }}>
                                            <img style={{width: "32px"}} src="/src/images/delete_red.png" alt=""/>
                                            <p>Odstrániť</p>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        width: "100%",
                        height: "100%"
                    }}>
                        <h1>Filament sa nenašiel</h1>
                        <h2>:(</h2>
                        <p>Pravdepodobne ste zadali zlé číslo filamentu</p>
                    </div>
            }
        </div>
    )
}

export default Filament;