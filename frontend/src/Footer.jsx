function Footer() {
    return (
        <footer style={{display: "flex", justifyContent: "center", alignItems: "center",  gap: "4em", padding: "2em", background: "black"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "end", gap: "0.25em", paddingBottom: "16px"}}>
                <h2>Filamenty</h2>
                <p>© 2025</p>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <p style={{fontSize: "1.2em"}}>Peter Cyprich</p>
                <a href={"mailto:cypooriginal@gmail.com"} target={"_blank"}>cypooriginal@gmail.com</a>
                <a href={"mailto:cyprich6@stud.uniza.sk"} target={"_blank"}>cyprich6@stud.uniza.sk</a>
            </div>
        </footer>
    )
}

export default Footer;