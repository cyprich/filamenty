import config from "./config.json"
import {useState} from "react";
import axios from "axios";

function EditFilament({id, fieldName, spoolWeight}) {
    const IP = config.ip;
    const [toggleEdit, setToggleEdit] = useState(false)
    const [value, setValue] = useState(0)

    function handleChange() {
        console.log(fieldName)

        axios.put(`http://${IP}:5000/api/filaments/${id - 1}/`, {
            key: fieldName,
            value: ((fieldName === "weight" && spoolWeight > 0) ? value + spoolWeight : value)
        })
            .then((response) => {
                console.log(response);
                setToggleEdit(false);
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <td style={{display: "flex", alignItems: "center"}}>
            {
                toggleEdit
                    ? <div>
                        <input type="number" onChange={(e) => setValue(Number(e.target.value))}/>
                        {/*TODO zmenit na ikonky*/}
                        <button onClick={() => handleChange()}>Potvrdiť</button>
                        <button onClick={() => setToggleEdit(false)}>Zrušiť</button>
                    </div>
                    : <img style={{width: "20px", height: "auto"}} src={"/src/images/edit.png"} alt=""
                           onClick={() => setToggleEdit(!toggleEdit)}/>
            }
        </td>
    )
}

export default EditFilament;