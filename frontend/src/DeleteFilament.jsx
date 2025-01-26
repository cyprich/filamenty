import {useEffect} from "react";

function DeleteFilament({image_url, setShowDelete}) {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0, 0.8)"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1em",
                padding: "32px",
                backgroundColor: "white"
            }} className={"custom-border"}>
                <h2>Odstrániť?</h2>
                <img src={image_url} alt="" style={{width: "16em", height: "auto"}}/>
                <div style={{textAlign: "center"}}>
                    <p>Naozaj si prajete odstrániť tento filament?</p>
                    <p>Tento krok sa nedá vrátiť späť</p>
                </div>
                <div style={{display: "flex", gap: "1em"}}>
                    <button>Vymazať</button>
                    <button onClick={() => setShowDelete(false)}>Zrušiť</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteFilament;