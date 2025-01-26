import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate();

    return (
        <header style={{
            display: "flex",
            alignItems: "center",
            padding: "1.2em 3.6em",
            backgroundColor: "black",
            gap: "2em",
            color: "white"
        }}>
            <img src={"/src/images/icon.png"} alt="" style={{width: "3em", height: "auto", paddingRight: "1em"}} onClick={() => navigate("/")}/>
            <p onClick={() => navigate("/")}>Domov</p>
            <p onClick={() => navigate("/stitky")}>Štítky</p>
        </header>
    )
}

export default Header;