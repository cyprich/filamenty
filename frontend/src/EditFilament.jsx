import config from "./config.json"
import {useState} from "react";

function EditFilament() {
    const IP = config.ip;

    const [toggleEdit, setToggleEdit] = useState(false)

    return (
        <td style={{display: "flex", alignItems: "center"}}>
            {
                toggleEdit
                    ? <div>
                        <input type="number"/>
                        {/*TODO zmenit na ikonky*/}
                        <button>Potvrdiť</button>
                        <button onClick={() => setToggleEdit(false)}>Zrušiť</button>
                    </div>
                    : <img style={{width: "20px", height: "auto"}} src={"/src/images/edit.png"} alt=""
                           onClick={() => setToggleEdit(!toggleEdit)}/>
            }
        </td>
    )
}

export default EditFilament;