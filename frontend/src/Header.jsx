import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate();

    return (
        <header className={"flex items-center gap-8 px-16 py-5 bg-zinc-950"}>
            <img className={"clickable-small w-12 h-12 mr-4"} src={"/src/images/icon.png"} alt=""
                 onClick={() => navigate("/")}/>
            <p className={"clickable-small"} onClick={() => navigate("/")}>Filamenty</p>
            <p className={"clickable-small"} onClick={() => navigate("/stitky")}>Štítky</p>
        </header>
    )
}

export default Header;