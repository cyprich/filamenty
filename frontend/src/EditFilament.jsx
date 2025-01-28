import config from "./config.json"
import {useState} from "react";
import axios from "axios";

function EditFilament({id, fieldName, additional_data}) {
    const IP = config.ip;
    const [toggleEdit, setToggleEdit] = useState(false)
    const [value, setValue] = useState(0)

    function generate_data() {
        if (fieldName === 'weight_full') {
            return {
                key: "weight",
                value: value + additional_data
            }
        } else if (fieldName === "price_kg") {
            return {
                key: "price",
                value: value * (additional_data / 1000)
            }
        } else {
            return {
                key: fieldName,
                value: value
            }
        }
    }

    function handleChange() {
        axios.put(`http://${IP}:5000/api/filaments/${id}/`, generate_data())
            .then((response) => {
                console.log(response);
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <td className={"flex items-center h-full"}>
            {
                toggleEdit
                    ? <div className={"flex gap-4"}>
                        <input className={"border rounded-xl p-1"} type="number" onChange={(e) => setValue(Number(e.target.value))}/>
                        <button className={"clickable-small border"} onClick={() => handleChange()}>Potvrdiť</button>
                        <button className={"clickable-small border"} onClick={() => setToggleEdit(false)}>Zrušiť</button>
                    </div>
                    : <img className={"clickable w-6 h-6"} src={"/src/images/edit.png"} alt=""
                           onClick={() => setToggleEdit(!toggleEdit)}/>
            }
        </td>
    )
}

export default EditFilament;