import {useState} from "react";
import config from "./config.json"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddFilament() {
    const IP = config.ip
    let navigate = useNavigate();

    const [vendor, setVendor] = useState("")
    const [material, setMaterial] = useState("")
    const [color, setColor] = useState("#333333")
    const [secondColor, setSecondColor] = useState("#666666")
    const [toggleSecondColor, setToggleSecondColor] = useState(false)
    const [tempMin, setTempMin] = useState(0)
    const [tempMax, setTempMax] = useState(0)
    const [tempBedMin, setTempBedMin] = useState(0)
    const [tempBedMax, setTempBedMax] = useState(0)
    const [weight, setWeight] = useState(0)
    const [weightSpool, setWeightSpool] = useState(0)
    const [weightOrig, setWeightOrig] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)


    // text and number dependencies - required fields
    const [depsAreOK, setDepsAreOK] = useState(true)
    const textDeps = [vendor, material]
    const numDeps = [tempMin, tempMax, tempBedMin, tempBedMax, weight, weightSpool, weightOrig, price]

    function handleSubmit() {
        if (checkDeps()) {
            // https://uploadcare.com/blog/how-to-upload-file-in-react/
            const formData = new FormData();

            formData.append("vendor", vendor)
            formData.append("material", material)
            formData.append("color_hex", color)
            toggleSecondColor && formData.append("color_second_hex", secondColor)
            formData.append("temp_min", tempMin)
            formData.append("temp_max", tempMax)
            formData.append("temp_bed_min", tempBedMin)
            formData.append("temp_bed_max", tempBedMax)
            formData.append("weight", weight)
            formData.append("weight_spool", weightSpool)
            formData.append("weight_orig", weightOrig)
            formData.append("weight_orig", weightOrig)
            formData.append("weight_orig", weightOrig)
            formData.append("weight_orig", weightOrig)
            formData.append("weight_orig", weightOrig)
            formData.append("price", price)
            formData.append("image", image)

            axios.post(
                `http://${IP}:5000/api/filaments/`,
                formData,
                {headers: {"Content-Type": "multipart/form-data"}})
                .then((response) => {
                    console.log(response);
                    navigate(`/filament/${response.data.filaments.id}`)
                })
                .catch((error) => console.error(error))

        }
    }

    function handleImageChange(event) {
        const file = event.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    function checkDeps() {
        const textDepsAreOK = textDeps.every(i => i !== "")
        const numDepsAreOK = numDeps.every(i => i != 0)
        const imageIsOK = image !== null;

        setDepsAreOK(textDepsAreOK && numDepsAreOK && imageIsOK)
        return textDepsAreOK && numDepsAreOK && imageIsOK
    }

    return (
        <div className={"filament add-filament"}>
            <div>
                <div className={"custom-upload custom-border"} style={{position: "relative"}}>
                    {
                        imagePreview !== null
                            ? <>
                                <img src={imagePreview} alt="" style={{
                                    width: "inherit",
                                    height: "inherit",
                                    objectFit: "contain",
                                    borderRadius: "inherit"
                                }}/>
                                <img className={"icon"} src={"src/images/delete_red.png"} alt="" onClick={() => {
                                    setImage(null)
                                    setImagePreview(null)
                                }}/>
                            </>
                            : <label htmlFor="fileInput">Kliknutím zvoľte obrázok</label>
                    }

                    <input
                        type="file"
                        id={"fileInput"}
                        accept={"image/jpeg, image/png"}
                        onChange={(e) => handleImageChange(e)}
                    />
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
                        <td><input type="text" onChange={(e) => setMaterial(e.target.value)} value={material}/></td>
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
                            <td><input type="color" onChange={(e) => setSecondColor(e.target.value)}
                                       value={secondColor}/></td>
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
                            <input type="number" onChange={(e) => setTempBedMin(e.target.value)}
                                   value={tempBedMin || ""}/> -
                            <input type="number" onChange={(e) => setTempBedMax(e.target.value)}
                                   value={tempBedMax || ""}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Hmotnosť so spoolom</td>
                        <td><input type="number" onChange={(e) => setWeight(e.target.value)} value={weight || ""}/></td>
                    </tr>
                    <tr>
                        <td>Hmotnosť spoolu</td>
                        <td><input type="number" onChange={(e) => setWeightSpool(e.target.value)}
                                   value={weightSpool || ""}/></td>
                    </tr>
                    <tr>
                        <td>Pôvodná hmotnosť</td>
                        <td><input type="number" onChange={(e) => setWeightOrig(e.target.value)}
                                   value={weightOrig || ""}/></td>
                    </tr>
                    <tr>
                        <td>Cena</td>
                        <td><input type="number" onChange={(e) => setPrice(e.target.value)} value={price || ""}/></td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display: "flex", gap: "2em", alignItems: "center"}}>
                    <button style={{width: "max-content", padding: "1em 4em"}} onClick={() => handleSubmit()}>Potvrdiť
                    </button>
                    {
                        depsAreOK || <p style={{color: "red"}}>Prosím vyplňte všetky polia</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddFilament;