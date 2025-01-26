import {useEffect, useState} from "react";
import config from "./config.json"
import axios from "axios";

function AddFilament() {
    const IP = config.ip

    const [vendor, setVendor] = useState("")
    const [material, setMaterial] = useState("")
    const [color, setColor] = useState("")
    const [secondColor, setSecondColor] = useState("")
    const [toggleSecondColor, setToggleSecondColor] = useState(false)
    const [tempMin, setTempMin] = useState(0)
    const [tempMax, setTempMax] = useState(0)
    const [tempBedMin, setTempBedMin] = useState(0)
    const [tempBedMax, setTempBedMax] = useState(0)
    const [weight, setWeight] = useState(0)
    const [weightSpool, setWeightSpool] = useState(0)
    const [weightOrig, setWeightOrig] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(undefined)

    // text and number dependencies - required fields
    const [depsAreOK, setDepsAreOK] = useState(true)
    const textDeps = [vendor, material]
    const numDeps = [tempMin, tempMax, tempBedMin, tempBedMax, weight, weightSpool, weightOrig, price]

    function handleSubmit() {
        const textDepsAreOK = textDeps.every(i => i !== "")
        const numDepsAreOK = numDeps.every(i => i != 0)

        setDepsAreOK(textDepsAreOK && numDepsAreOK)
    }

    return (
        <div className={"filament add-filament"}>
            <div>
                <div className={"custom-upload custom-border"}>
                    <label htmlFor="fileInput">Zvoľte obrázok</label>
                    <input type="file" id={"fileInput"}/>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "2em"}}>
                <h1>Nový filament</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>Výrobca</td>
                        <td>
                            <input type="text" onChange={(e) => setVendor(e.target.value)} value={vendor}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Materiál</td>
                        <td><input type="text" onChange={(e) => setMaterial(e.target.value)} value={material} /></td>
                    </tr>
                    <tr>
                        <td>Farba</td>
                        <td>
                            <input type="color" onChange={(e) => setColor(e.target.value)} value={color}/>
                            <button
                                onClick={() => setToggleSecondColor(!toggleSecondColor)}>
                                {toggleSecondColor ? "-" : "+"}
                            </button>
                        </td>
                    </tr>
                    {
                        toggleSecondColor &&
                        <tr>
                            <td>Sekundárna farba</td>
                            <td><input type="color" onChange={(e) => setSecondColor(e.target.value)} value={secondColor}/></td>
                        </tr>
                    }
                    <tr>
                        <td>Teplota tlače</td>
                        <td>
                            <input type="number" onChange={(e) => setTempMin(e.target.value)} value={tempMin || ""}/> -
                            <input type="number" onChange={(e) => setTempMax(e.target.value)} value={tempMax || ""}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Teplota podložky</td>
                        <td>
                            <input type="number" onChange={(e) => setTempBedMin(e.target.value)} value={tempBedMin || ""}/> -
                            <input type="number" onChange={(e) => setTempBedMax(e.target.value)} value={tempBedMax || ""}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Hmotnosť so spoolom</td>
                        <td><input type="number" onChange={(e) => setWeight(e.target.value)} value={weight || ""}/></td>
                    </tr>
                    <tr>
                        <td>Hmotnosť spoolu</td>
                        <td><input type="number" onChange={(e) => setWeightSpool(e.target.value)} value={weightSpool || ""}/></td>
                    </tr>
                    <tr>
                        <td>Pôvodná hmotnosť</td>
                        <td><input type="number" onChange={(e) => setWeightOrig(e.target.value)} value={weightOrig || ""}/></td>
                    </tr>
                    <tr>
                        <td>Cena</td>
                        <td><input type="number" onChange={(e) => setPrice(e.target.value)} value={price || ""}/></td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display: "flex", gap: "2em", alignItems: "center"}}>
                    <button style={{width: "max-content", padding: "1em 4em"}} onClick={() => handleSubmit()}>Potvrdiť</button>
                    {
                        depsAreOK || <p style={{color: "red"}}>Prosím vyplňte všetky povinné polia</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddFilament;